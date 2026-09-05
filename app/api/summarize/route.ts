import { NextResponse } from "next/server";

type SummaryAction = { id: number; text: string; owner: string };
type SummaryRequest = { context: string; transcript: string[] };
type SummaryResponse = { outcome: string; actions: SummaryAction[] };

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL ?? "gpt-4o-mini";

function isSummaryResponse(value: unknown): value is SummaryResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as SummaryResponse;
  return typeof candidate.outcome === "string" && Array.isArray(candidate.actions) && candidate.actions.every(
    (action) => action && typeof action.text === "string" && typeof action.owner === "string",
  );
}

function extractResponseText(value: { output?: Array<{ content?: Array<{ text?: string }> }> }): string {
  return value.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("") ?? "";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 503 });

  const body = (await request.json()) as SummaryRequest;
  const transcript = body.transcript.filter(Boolean).join("\n") || "No transcript was captured.";
  const prompt = [
    "Summarize this call for the participants.",
    `Context: ${body.context || "No context provided."}`,
    `Transcript:\n${transcript}`,
    "Return JSON only with this shape: {\"outcome\": string, \"actions\": [{\"text\": string, \"owner\": string}]}.",
    "Keep the outcome to 1-2 concise sentences. Extract only concrete next steps; use 'Unassigned' when no owner is stated.",
  ].join("\n\n");

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: SUMMARY_MODEL, input: prompt, temperature: 0.2 }),
  });
  if (!response.ok) return NextResponse.json({ error: "The AI summary service could not complete the request." }, { status: 502 });

  const responseBody = (await response.json()) as { output?: Array<{ content?: Array<{ text?: string }> }> };
  try {
    const parsed: unknown = JSON.parse(extractResponseText(responseBody).replace(/^```json\s*|\s*```$/g, ""));
    if (!isSummaryResponse(parsed)) throw new Error("Invalid summary format");
    return NextResponse.json({ outcome: parsed.outcome, actions: parsed.actions.map((action, index) => ({ ...action, id: index + 1, done: false })) });
  } catch {
    return NextResponse.json({ error: "The AI returned an unreadable summary." }, { status: 502 });
  }
}

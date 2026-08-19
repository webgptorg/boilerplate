"use client";

import { BookEditor, type BookEditorProps } from "@promptbook/components";
import { useState } from "react";
import { Badge, Button } from "@/components/ui";

type BookValue = NonNullable<BookEditorProps["value"]>;

const INITIAL_BOOK = `PERSONA
You are a practical AI teammate for a software company.

GOAL
Help the team turn scattered knowledge into clear action.

RULE
Prefer facts from provided company context over assumptions.

RULE
When information is missing, say so explicitly.

STYLE
Be concise, useful, and easy to work with.` as BookValue;

export function BookExample() {
  const [value, setValue] = useState<BookValue>(INITIAL_BOOK);

  return (
    <div className="book-demo">
      <div className="book-demo-header">
        <div className="book-demo-title">
          <strong>assistant.book</strong>
          <span>Live @promptbook/components example</span>
        </div>
        <div className="inline-row">
          <Badge tone="green">Editable</Badge>
          <Button variant="ghost" onClick={() => setValue(INITIAL_BOOK)}>
            Reset
          </Button>
        </div>
      </div>
      <BookEditor className="book-editor" value={value} onChange={setValue} />
    </div>
  );
}

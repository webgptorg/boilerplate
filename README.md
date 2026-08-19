# Promptbook Starter

Promptbook-branded Next.js starter for small internal tools, demos, product experiments, and new Promptbook web projects.

## Included

- Next.js App Router + TypeScript
- Promptbook brand tokens from the official brand kit
- Outfit headlines + Inter UI typography through `next/font`
- Small local UI primitives in `components/ui`
- `@promptbook/components`
- Live `BookEditor` example
- ESLint + TypeScript checks
- LF line endings via `.gitattributes` and `.editorconfig`

## Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before committing:

```bash
npm run check
npm run build
```

## Structure

```text
app/
  globals.css      Promptbook tokens and global styles
  layout.tsx       metadata + Outfit/Inter
  page.tsx         starter showcase
components/
  ui/              small reusable primitives
  book-example.tsx real @promptbook/components example
  promptbook-brand.tsx
lib/
  cn.ts            tiny className helper
```

## Brand

Core colors:

- Promptbook Blue `#7AEBFF`
- Promptbook Blue Dark `#30A8BD`
- Promptbook Green `#7AFFEB`
- Promptbook Green Dark `#30BDA8`
- Dark Gray `#111827`
- Light Gray `#F3F4F6`

Typography:

- **Outfit** — headlines and high-visibility statements
- **Inter** — interface and body copy

See the current brand kit at https://www.ptbk.io/branding before creating new logos or brand variants.

## Promptbook ecosystem

- Product: https://www.ptbk.io/
- Coder: https://coder.ptbk.io/
- Promptbook repository: https://github.com/webgptorg/promptbook
- Components: `@promptbook/components`

The starter is intentionally small. Prefer extending the local primitives over introducing a large UI framework unless the product genuinely needs one.

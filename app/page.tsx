import { BookExample } from "@/components/book-example";
import { PromptbookBrand } from "@/components/promptbook-brand";
import { Badge, Card, Input, buttonClassName } from "@/components/ui";

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <PromptbookBrand />
          <nav className="header-nav" aria-label="Main navigation">
            <a href="#components">Components</a>
            <a href="#book-editor">Book editor</a>
            <a
              className={buttonClassName("secondary")}
              href="https://github.com/webgptorg/boilerplate"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div>
            <span className="eyebrow">Promptbook internal starter</span>
            <h1>
              Start practical AI products with the{" "}
              <span className="gradient-text">right defaults.</span>
            </h1>
            <p className="hero-copy">
              A small Next.js foundation for Promptbook projects: official brand
              colors and typography, strict TypeScript, reusable UI primitives,
              and a real Promptbook BookEditor example.
            </p>
            <div className="actions">
              <a
                className={buttonClassName("primary")}
                href="https://github.com/webgptorg/boilerplate"
              >
                Use this starter ↗
              </a>
              <a className={buttonClassName("secondary")} href="https://www.ptbk.io/">
                ptbk.io ↗
              </a>
              <a className={buttonClassName("ghost")} href="https://coder.ptbk.io/">
                Promptbook Coder ↗
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Promptbook file preview">
            <div className="panel-topbar">
              <div className="window-dots" aria-hidden="true">
                <span className="window-dot" />
                <span className="window-dot" />
                <span className="window-dot" />
              </div>
              <span>assistant.book</span>
            </div>
            <div className="code-preview">
              <span className="code-comment"># Promptbook starter</span>
              {"\n\n"}
              <span className="code-keyword">PERSONA</span>
              {"\n"}Practical AI teammate{"\n\n"}
              <span className="code-keyword">GOAL</span>
              {"\n"}Turn knowledge into action{"\n\n"}
              <span className="code-keyword">RULE</span>
              {"\n"}Say when you do not know
            </div>
          </div>
        </section>

        <section className="section section-muted">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Defaults</span>
              <h2>Small enough to understand. Useful enough to keep.</h2>
              <p>
                The starter intentionally avoids a giant UI framework. The shared
                layer is a handful of readable components and CSS variables that
                can grow with the product instead of fighting it.
              </p>
            </div>

            <div className="grid-3">
              <Card>
                <span className="card-kicker">01 · Brand</span>
                <h3>Promptbook by default</h3>
                <p>
                  Outfit for headlines, Inter for interface text, and the official
                  blue, green, ink, and light-gray palette as CSS design tokens.
                </p>
              </Card>
              <Card>
                <span className="card-kicker">02 · Code</span>
                <h3>Server-first Next.js</h3>
                <p>
                  App Router, strict TypeScript, path aliases, small components,
                  and client boundaries only where interaction actually needs them.
                </p>
              </Card>
              <Card>
                <span className="card-kicker">03 · Promptbook</span>
                <h3>Ecosystem-ready</h3>
                <p>
                  @promptbook/components is installed from day one, with a live
                  BookEditor example ready to replace with your real agent flow.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="container section" id="components">
          <div className="section-heading">
            <span className="eyebrow">UI primitives</span>
            <h2>A few components to start building immediately.</h2>
            <p>
              Copy the patterns, rename them, or delete them. They are deliberately
              local and boring so future projects stay easy to change.
            </p>
          </div>

          <div className="component-grid">
            <Card className="component-card">
              <span className="card-kicker">Buttons</span>
              <div className="inline-row">
                <button className={buttonClassName("primary")}>Primary</button>
                <button className={buttonClassName("secondary")}>Secondary</button>
                <button className={buttonClassName("ghost")}>Ghost</button>
              </div>
            </Card>

            <Card className="component-card">
              <span className="card-kicker">Status</span>
              <div className="inline-row">
                <Badge>Promptbook</Badge>
                <Badge tone="green">Connected</Badge>
                <Badge tone="neutral">Draft</Badge>
              </div>
            </Card>

            <Card className="component-card component-card-wide">
              <span className="card-kicker">Form controls</span>
              <Input
                id="demo-question"
                label="Ask your company knowledge"
                placeholder="Where is our onboarding checklist?"
              />
            </Card>
          </div>
        </section>

        <section className="section section-muted" id="book-editor">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">@promptbook/components</span>
              <h2>Edit an agent directly in the starter.</h2>
              <p>
                This is the real BookEditor from the Promptbook component package.
                It demonstrates the intended client-component boundary and gives
                every new project an immediate Promptbook-native example.
              </p>
            </div>
            <BookExample />
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <span className="eyebrow">Design tokens</span>
            <h2>The core Promptbook palette, visible and reusable.</h2>
          </div>
          <div className="token-strip" aria-label="Promptbook color tokens">
            <div className="token token-blue">Blue · #7AEBFF</div>
            <div className="token token-blue-dark">Blue Dark · #30A8BD</div>
            <div className="token token-green">Green · #7AFFEB</div>
            <div className="token token-green-dark">Green Dark · #30BDA8</div>
            <div className="token token-ink">Dark Gray · #111827</div>
          </div>
        </section>
      </main>

      <footer className="container site-footer">
        <div className="footer-inner">
          <PromptbookBrand />
          <span>Create AI that truly understands your business.</span>
        </div>
      </footer>
    </div>
  );
}

import * as React from "react";
import { Command as CommandIcon, Menu, Search } from "lucide-react";
import { Button, GlassElementLayers, Kbd, LiquidGlassFilter, ScrollArea, useCommandPalette } from "@alkamanas/ui";

import { DocsLogoMark, DocsThemeAwareWordmark } from "./brand-logo";
import { componentIds, groupedDocs, type DocItem } from "./docs-data";
import { getDocHref } from "./docs-routes";
import { getPrimaryThemeStyle, PrimaryColorSwitcher, type DocsThemeModeId, type GlassEffectId, type PrimaryThemeId } from "./docs-theme";

function Brand() {
  return (
    <a href={getDocHref("introduction")} className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground">
      <DocsLogoMark className="block h-8 w-10 shrink-0 object-contain sm:hidden" />
      <DocsThemeAwareWordmark className="hidden h-7 w-44 shrink-0 sm:block" />
    </a>
  );
}

function CommandButton() {
  const command = useCommandPalette();
  return (
    <Button variant="outline" size="sm" onClick={command.open} className="border-white/10 bg-white/[0.03]">
      <CommandIcon className="h-4 w-4" />
      Search
    </Button>
  );
}

function SidebarCommandButton() {
  const command = useCommandPalette();

  return (
    <Button
      variant="outlineFlat"
      size="sm"
      onClick={command.open}
      className="mx-1 h-10 w-[calc(100%-0.5rem)] justify-start gap-2 px-3 text-muted-foreground"
    >
      <Search className="h-4 w-4" />
      <span className="min-w-0 flex-1 truncate text-left">Search documentation...</span>
      <Kbd>Ctrl K</Kbd>
    </Button>
  );
}

type TocItem = {
  id: string;
  label: string;
};

function collectTocItems(root: HTMLElement | null): TocItem[] {
  if (!root) return [];

  const seen = new Set<string>();
  return Array.from(root.querySelectorAll<HTMLElement>("[data-docs-toc][id]"))
    .map((element) => ({
      id: element.id,
      label: element.dataset.docsToc?.trim() || element.textContent?.trim() || element.id,
    }))
    .filter((item) => {
      if (!item.id || !item.label || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
}

function areTocItemsEqual(current: TocItem[], next: TocItem[]) {
  return current.length === next.length && current.every((item, index) => item.id === next[index]?.id && item.label === next[index]?.label);
}

function OnThisPagePanel({ items }: { items: TocItem[] }) {
  return (
    <div className="alka-card-surface alka-liquid-glass relative overflow-hidden rounded-[var(--alka-radius-card)] border border-[hsl(var(--alka-panel-border))] p-7 text-sm shadow-[var(--alka-shadow-panel)]">
      <GlassElementLayers />
      <div className="relative z-10 grid gap-3">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/70">
          On This Page
        </p>
        <nav className="grid gap-2">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="block leading-5 text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

function SidebarNav({ activeId }: { activeId: string }) {
  return (
    <aside className="alka-liquid-glass fixed bottom-4 left-4 top-4 z-30 hidden w-[264px] overflow-hidden rounded-3xl border lg:flex lg:flex-col">
      <GlassElementLayers />
      <div className="flex justify-center border-b border-white/[0.06] px-5 py-4">
        <Brand />
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-3">
          <SidebarCommandButton />
          <nav className="mt-5 space-y-5">
            {Object.entries(groupedDocs).map(([group, items]) =>
              items.length ? (
                <div key={group}>
                  <p className="px-3 pb-1 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/60">
                    {group}
                  </p>
                  <div className="grid gap-1">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={getDocHref(item.id)}
                        data-active={activeId === item.id}
                        className="docs-sidebar-link"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}

function Topbar({ activeId, activeTitle }: { activeId: string; activeTitle: string }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [activeId]);

  React.useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="docs-mobile-topbar sticky top-3 z-50 mx-3 mb-3 lg:hidden" data-open={menuOpen}>
      <div className="docs-mobile-topbar-panel alka-liquid-glass relative z-20 flex h-16 items-center justify-between overflow-hidden rounded-full border px-3.5">
        <GlassElementLayers />
        <Brand />
        <div className="relative z-10 flex items-center gap-2">
          <CommandButton />
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="docs-mobile-menu"
            className="docs-mobile-menu-trigger"
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
          >
            <Menu className="docs-mobile-menu-icon h-4 w-4" />
            <span className="docs-mobile-menu-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </Button>
        </div>
      </div>
      <div
        id="docs-mobile-menu"
        className="docs-mobile-menu fixed inset-0 z-10 overflow-y-auto px-5 pb-10 pt-24"
        aria-hidden={!menuOpen}
      >
        <div className="docs-mobile-menu-bg fixed inset-x-0 top-0 h-dvh" aria-hidden="true" />
        <nav className="docs-mobile-menu-content relative mx-auto max-w-[520px]">
          <p className="pb-5 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/70">
            {activeTitle}
          </p>
          <div className="grid gap-7">
            {Object.entries(groupedDocs).map(([group, items]) =>
              items.length ? (
                <div key={group} className="grid gap-2">
                  <p className="px-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground/55">
                    {group}
                  </p>
                  <div className="grid gap-1">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={getDocHref(item.id)}
                        data-active={activeId === item.id}
                        className="docs-mobile-menu-link"
                        onClick={closeMenu}
                      >
                        <span>{item.title}</span>
                        <span className="text-sm text-muted-foreground/55">{item.group === "Components" ? "Component" : item.group}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const code = typeof children === "string" ? children : React.Children.toArray(children).join("");

  return (
    <pre className="docs-code-block overflow-x-auto rounded-xl border border-white/[0.08] bg-[#070707]/90 p-4 text-sm leading-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  );
}

const codeKeywords = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "interface",
  "let",
  "new",
  "of",
  "return",
  "switch",
  "throw",
  "try",
  "type",
  "typeof",
  "var",
  "while",
]);

const codeLiterals = new Set(["false", "null", "true", "undefined"]);

function escapeCode(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function codeToken(kind: string, value: string) {
  return `<span class="docs-code-token docs-code-${kind}">${escapeCode(value)}</span>`;
}

function highlightTag(source: string) {
  return source.replace(
    /(\/?)([A-Za-z][\w:.-]*)(\s+[\s\S]*?)?(\/?)$/,
    (_match, slash: string, name: string, attributes = "", selfClose: string) => {
      const highlightedAttributes = attributes.replace(/([A-Za-z_:][\w:.-]*)(=)("[^"]*"|'[^']*'|\{[^}]*\})?/g, (_attr: string, attrName: string, equals: string, attrValue = "") => {
        const valueKind = attrValue.startsWith("{") ? "expression" : "string";
        return `${codeToken("attr", attrName)}${codeToken("punctuation", equals)}${attrValue ? codeToken(valueKind, attrValue) : ""}`;
      });

      return `${slash ? codeToken("punctuation", slash) : ""}${codeToken("tag", name)}${highlightedAttributes}${selfClose ? codeToken("punctuation", selfClose) : ""}`;
    },
  );
}

function highlightCode(value: string) {
  const code = value.replace(/\r\n/g, "\n");
  let html = "";
  let index = 0;

  while (index < code.length) {
    const char = code[index];
    const next = code[index + 1];

    if (char === "/" && next === "/") {
      const end = code.indexOf("\n", index);
      const comment = end === -1 ? code.slice(index) : code.slice(index, end);
      html += codeToken("comment", comment);
      index += comment.length;
      continue;
    }

    if (char === "/" && next === "*") {
      const end = code.indexOf("*/", index + 2);
      const comment = end === -1 ? code.slice(index) : code.slice(index, end + 2);
      html += codeToken("comment", comment);
      index += comment.length;
      continue;
    }

    if (char === "'" || char === "\"" || char === "`") {
      const quote = char;
      let end = index + 1;
      let escaped = false;
      while (end < code.length) {
        const current = code[end];
        if (!escaped && current === quote) {
          end += 1;
          break;
        }
        escaped = !escaped && current === "\\";
        if (current !== "\\") escaped = false;
        end += 1;
      }
      const stringValue = code.slice(index, end);
      html += codeToken("string", stringValue);
      index = end;
      continue;
    }

    if (char === "<" && /[A-Za-z/]/.test(next ?? "")) {
      const end = code.indexOf(">", index + 1);
      if (end !== -1) {
        html += codeToken("punctuation", "<");
        html += highlightTag(code.slice(index + 1, end));
        html += codeToken("punctuation", ">");
        index = end + 1;
        continue;
      }
    }

    if (/\d/.test(char)) {
      const match = code.slice(index).match(/^\d+(?:\.\d+)?/);
      if (match) {
        html += codeToken("number", match[0]);
        index += match[0].length;
        continue;
      }
    }

    if (/[A-Za-z_$]/.test(char)) {
      const match = code.slice(index).match(/^[A-Za-z_$][\w$]*/);
      if (match) {
        const word = match[0];
        const rest = code.slice(index + word.length);
        if (codeKeywords.has(word)) html += codeToken("keyword", word);
        else if (codeLiterals.has(word)) html += codeToken("literal", word);
        else if (/^\s*\(/.test(rest)) html += codeToken("function", word);
        else if (/^[A-Z]/.test(word)) html += codeToken("type", word);
        else html += escapeCode(word);
        index += word.length;
        continue;
      }
    }

    if ("{}[]().,;:=+-*".includes(char)) {
      html += codeToken("punctuation", char);
      index += 1;
      continue;
    }

    html += escapeCode(char);
    index += 1;
  }

  return html;
}

export function PageChrome({
  activeDoc,
  children,
  primaryTheme,
  onPrimaryThemeChange,
  themeMode,
  onThemeModeChange,
  glassEffect,
  onGlassEffectChange,
  routeMotion,
  routeKey,
}: {
  activeDoc: DocItem;
  children: React.ReactNode;
  primaryTheme: PrimaryThemeId;
  onPrimaryThemeChange: (value: PrimaryThemeId) => void;
  themeMode: DocsThemeModeId;
  onThemeModeChange: (value: DocsThemeModeId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
  routeMotion: "enter" | "exit";
  routeKey: string;
}) {
  const showPrimarySwitcher = activeDoc.id === "components" || componentIds.has(activeDoc.id);
  const articleRef = React.useRef<HTMLElement | null>(null);
  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);

  React.useLayoutEffect(() => {
    const updateToc = () => {
      const nextItems = collectTocItems(articleRef.current);
      setTocItems((currentItems) => (areTocItemsEqual(currentItems, nextItems) ? currentItems : nextItems));
    };

    updateToc();
    const frame = window.requestAnimationFrame(updateToc);
    const article = articleRef.current;
    const observer = article ? new MutationObserver(updateToc) : null;
    if (article && observer) {
      observer.observe(article, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["data-docs-toc", "id"],
      });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [activeDoc.id, routeKey, children]);

  return (
    <div className={`theme-${themeMode} alka-theme-${themeMode} docs-shell text-foreground`} data-glass-effect={glassEffect} style={getPrimaryThemeStyle(primaryTheme, themeMode)}>
      <LiquidGlassFilter />
      <Topbar activeId={activeDoc.id} activeTitle={activeDoc.title} />
      {showPrimarySwitcher ? (
        <PrimaryColorSwitcher
          value={primaryTheme}
          onChange={onPrimaryThemeChange}
          themeMode={themeMode}
          onThemeModeChange={onThemeModeChange}
          glassEffect={glassEffect}
          onGlassEffectChange={onGlassEffectChange}
          className="fixed bottom-4 right-4 z-40 w-[min(92vw,20rem)] lg:hidden"
        />
      ) : null}
      <div className="relative z-10 min-h-dvh lg:pl-[296px]">
        <SidebarNav activeId={activeDoc.id} />
        <main className="min-w-0">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-10 lg:py-10">
            <article
              ref={articleRef}
              key={routeKey}
              className="docs-apple-motion-page min-w-0"
              data-route-motion={routeMotion}
            >
              {children}
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-4 space-y-4">
                {tocItems.length ? <OnThisPagePanel items={tocItems} /> : null}
                {showPrimarySwitcher ? (
                  <PrimaryColorSwitcher
                    value={primaryTheme}
                    onChange={onPrimaryThemeChange}
                    themeMode={themeMode}
                    onThemeModeChange={onThemeModeChange}
                    glassEffect={glassEffect}
                    onGlassEffectChange={onGlassEffectChange}
                  />
                ) : null}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

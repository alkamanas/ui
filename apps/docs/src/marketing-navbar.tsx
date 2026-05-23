import { Search } from "lucide-react";
import { Button, Kbd, Navbar, NavbarCTA, useCommandPalette } from "@alkamanas/ui";

import { docsNavbarLogo } from "./brand-logo";
import { getDocHref } from "./docs-routes";
import { getPrimaryThemeStyle, type DocsThemeModeId, type PrimaryThemeId } from "./docs-theme";

function DocsMarketingSearchButton() {
  const command = useCommandPalette();

  return (
    <Button variant="outlineFlat" size="sm" onClick={command.open} className="hidden gap-2 md:inline-flex">
      <Search className="h-4 w-4" />
      Search docs
      <Kbd className="ml-1">Ctrl K</Kbd>
    </Button>
  );
}

export function DocsMarketingNavbar({
  themeMode,
  primaryTheme,
}: {
  themeMode: DocsThemeModeId;
  primaryTheme: PrimaryThemeId;
}) {
  return (
    <Navbar
      logo={docsNavbarLogo}
      theme={themeMode}
      syncThemeMeta={false}
      style={getPrimaryThemeStyle(primaryTheme, themeMode)}
      links={[
        { href: getDocHref("introduction"), label: "Docs" },
        { href: getDocHref("components"), label: "Components" },
        { href: getDocHref("blocks"), label: "Blocks" },
      ]}
      rightSlot={
        <div className="flex items-center gap-2">
          <DocsMarketingSearchButton />
          <NavbarCTA href={getDocHref("components")}>View Components</NavbarCTA>
        </div>
      }
      mobileFooterSlot={<NavbarCTA href={getDocHref("components")}>View Components</NavbarCTA>}
      className="docs-home-navbar"
    />
  );
}

"use client";

import * as React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  GlassElementLayers,
  LiquidGlassFilter,
  type GlassEffect,
  type GlassRealisticStrategy,
} from "@/components/surfaces/liquid-glass-filter";
import { buttonVariants } from "@/components/ui/button";

type NavbarTheme = "light" | "dark";
type NavbarLogoTone = NavbarTheme;
type NavbarLogoSize = "wide" | "compact";
type NavbarLogoToneMap = Partial<Record<NavbarLogoTone, React.ReactNode>>;
export type NavbarLogoWidths = Partial<Record<NavbarLogoSize, React.CSSProperties["width"]>>;

export type NavbarLogoVariant = React.ReactNode | NavbarLogoToneMap;

export type NavbarLogoConfig = {
  wide?: NavbarLogoVariant;
  compact?: NavbarLogoVariant;
  widths?: NavbarLogoWidths;
  wideWidth?: React.CSSProperties["width"];
  compactWidth?: React.CSSProperties["width"];
  light?: React.ReactNode;
  dark?: React.ReactNode;
  fallback?: React.ReactNode;
};

export type NavbarLinkItem = {
  href: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  onSelect?: () => void;
};

export type NavbarMenuGroup = {
  label: React.ReactNode;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: NavbarLinkItem[];
  secondaryItems?: NavbarLinkItem[];
};

export type NavbarLinkRendererProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export type NavbarRenderLink = React.ComponentType<NavbarLinkRendererProps>;

export type NavbarLinkProps = Omit<NavbarLinkItem, "label"> & {
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  linkComponent?: NavbarRenderLink;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export type NavbarCTAProps = NavbarLinkProps;

export type NavbarMenuItemProps = Omit<NavbarLinkProps, "children" | "label"> & {
  label: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  theme?: NavbarTheme;
};

export type NavbarLogoProps = {
  logo?: NavbarLogoConfig | React.ReactNode;
  brand?: React.ReactNode;
  widths?: NavbarLogoWidths;
  theme?: NavbarTheme;
  className?: string;
};

export type NavbarProps = {
  brand?: React.ReactNode;
  logo?: NavbarLogoConfig | React.ReactNode;
  logoWidths?: NavbarLogoWidths;
  links?: NavbarLinkItem[];
  menu?: NavbarMenuGroup;
  cta?: NavbarLinkItem;
  actions?: React.ReactNode;
  rightSlot?: React.ReactNode;
  mobileFooterSlot?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  panelClassName?: string;
  panelVisible?: boolean;
  linkComponent?: React.ComponentType<NavbarLinkRendererProps>;
  theme?: NavbarTheme | "auto";
  defaultTheme?: NavbarTheme;
  syncThemeMeta?: boolean;
  sectionSelector?: string;
  probeY?: number;
  glassEffect?: GlassEffect;
  glassRealisticStrategy?: GlassRealisticStrategy;
  mobileMenuLabel?: string;
  mobileMenuCloseLabel?: string;
};

export type SectionAwareNavbarProps = NavbarProps;

const mobileMenuEase = [0.4, 0, 0.6, 1] as const;

function DefaultLink({ href, className, children, onClick }: NavbarLinkRendererProps) {
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function isLogoToneMap(variant: NavbarLogoVariant): variant is NavbarLogoToneMap {
  return (
    !!variant &&
    typeof variant === "object" &&
    !React.isValidElement(variant) &&
    !Array.isArray(variant) &&
    ("light" in variant || "dark" in variant)
  );
}

function resolveLogoVariant(variant: NavbarLogoVariant | undefined, theme: NavbarTheme) {
  if (!variant || !isLogoToneMap(variant)) return variant;
  return variant[theme] ?? variant.light ?? variant.dark;
}

function resolveLogoNode(
  logo: NavbarLogoConfig | React.ReactNode | undefined,
  theme: NavbarTheme,
  size: NavbarLogoSize,
) {
  if (!logo || React.isValidElement(logo) || typeof logo !== "object") return logo;

  const config = logo as NavbarLogoConfig;
  const sizeVariant = size === "compact" ? config.compact : config.wide;
  return (
    resolveLogoVariant(sizeVariant, theme) ??
    config[theme] ??
    config.fallback ??
    resolveLogoVariant(config.wide, theme) ??
    resolveLogoVariant(config.compact, theme)
  );
}

function resolveLogoWidths(
  logo: NavbarLogoConfig | React.ReactNode | undefined,
  widths?: NavbarLogoWidths,
): NavbarLogoWidths {
  if (!logo || React.isValidElement(logo) || typeof logo !== "object" || Array.isArray(logo)) {
    return widths ?? {};
  }

  const config = logo as NavbarLogoConfig;

  return {
    wide: widths?.wide ?? config.widths?.wide ?? config.wideWidth,
    compact: widths?.compact ?? config.widths?.compact ?? config.compactWidth,
  };
}

function logoWidthStyle(width: React.CSSProperties["width"] | undefined): React.CSSProperties | undefined {
  return width === undefined ? undefined : { width };
}

export function NavbarLogo({ logo, brand, widths, theme = "light", className }: NavbarLogoProps) {
  const wideLogo = resolveLogoNode(logo, theme, "wide") ?? brand;
  const compactLogo = resolveLogoNode(logo, theme, "compact") ?? wideLogo;
  const resolvedWidths = resolveLogoWidths(logo, widths);

  return (
    <span className={cn("alka-navbar-logo flex min-w-0 items-center justify-start text-left", className)}>
      <span className="hidden min-w-0 shrink-0 items-center justify-start [&>img]:object-left [&>*]:max-w-full md:flex" style={logoWidthStyle(resolvedWidths.wide)}>
        {wideLogo}
      </span>
      <span className="flex min-w-0 shrink-0 items-center justify-start [&>img]:object-left [&>*]:max-w-full md:hidden" style={logoWidthStyle(resolvedWidths.compact)}>
        {compactLogo}
      </span>
    </span>
  );
}

export function NavbarLink({
  href,
  label,
  children,
  className,
  linkComponent: LinkComponent = DefaultLink,
  onClick,
  onSelect,
}: NavbarLinkProps) {
  return (
    <LinkComponent
      href={href}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
      }}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-normal no-underline transition-all duration-300",
        className,
      )}
    >
      {children ?? label}
    </LinkComponent>
  );
}

export function NavbarCTA({
  href,
  label,
  children,
  className,
  linkComponent: LinkComponent = DefaultLink,
  onClick,
  onSelect,
}: NavbarCTAProps) {
  return (
    <LinkComponent
      href={href}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
      }}
      className={cn(buttonVariants({ variant: "default", size: "sm" }), className)}
    >
      {children ?? label}
    </LinkComponent>
  );
}

export function NavbarMenuItem({
  href,
  label,
  description,
  eyebrow,
  icon: Icon,
  theme = "light",
  className,
  linkComponent: LinkComponent = DefaultLink,
  onClick,
  onSelect,
}: NavbarMenuItemProps) {
  const useDarkTheme = theme === "dark";

  return (
    <LinkComponent
      href={href}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
      }}
      className={cn(
        "group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 rounded-[1.25rem] border p-4 no-underline transition-all duration-300",
        useDarkTheme
          ? "border-white/8 bg-black/15 hover:border-white/18 hover:bg-white/[0.06]"
          : "border-black/[0.06] bg-white/70 hover:border-black/[0.12] hover:bg-white",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-2xl border",
          useDarkTheme ? "border-white/10 bg-white/[0.04] text-white" : "border-black/[0.08] bg-black/[0.03] text-primary",
        )}
      >
        {Icon ? <Icon className="h-5 w-5" strokeWidth={1.8} /> : <ArrowRight className="h-5 w-5" strokeWidth={1.8} />}
      </span>
      <span className="min-w-0">
        {eyebrow ? (
          <span className={cn("block font-mono text-[0.6rem] uppercase tracking-[0.16em]", useDarkTheme ? "text-white/40" : "text-muted-foreground")}>
            {eyebrow}
          </span>
        ) : null}
        <span className={cn("mt-1 block text-base font-semibold", useDarkTheme ? "text-white" : "text-foreground")}>
          {label}
        </span>
        {description ? (
          <span className={cn("mt-1.5 line-clamp-2 block text-sm leading-relaxed", useDarkTheme ? "text-white/55" : "text-muted-foreground")}>
            {description}
          </span>
        ) : null}
      </span>
    </LinkComponent>
  );
}

export function NavbarMenuSecondaryItem({
  href,
  label,
  icon: Icon,
  theme = "light",
  className,
  linkComponent: LinkComponent = DefaultLink,
  onClick,
  onSelect,
}: NavbarMenuItemProps) {
  const useDarkTheme = theme === "dark";

  return (
    <LinkComponent
      href={href}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
      }}
      className={cn(
        "group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium no-underline transition-all duration-300",
        useDarkTheme
          ? "border-white/8 text-white/72 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
          : "border-black/[0.07] text-foreground/72 hover:border-black/[0.14] hover:bg-black/[0.025] hover:text-foreground",
        className,
      )}
    >
      <span className="flex items-center gap-3">
        {Icon ? <Icon className="h-4 w-4" strokeWidth={1.8} /> : null}
        {label}
      </span>
      <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </LinkComponent>
  );
}

export function useActiveNavbarTheme({
  enabled = true,
  defaultTheme = "light",
  sectionSelector = "main [data-navbar-theme]",
  probeY = 120,
  syncThemeMeta = false,
}: {
  enabled?: boolean;
  defaultTheme?: NavbarTheme;
  sectionSelector?: string;
  probeY?: number;
  syncThemeMeta?: boolean;
}) {
  const [isAtTop, setIsAtTop] = React.useState(() =>
    typeof window === "undefined" ? true : window.scrollY < 64,
  );
  const [activeTheme, setActiveTheme] = React.useState<NavbarTheme>(defaultTheme);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const updateThemeMeta = (theme: NavbarTheme, themeColor: string) => {
      if (!syncThemeMeta) return;

      const metaThemeColors = Array.from(
        document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'),
      );

      if (metaThemeColors.length === 0) {
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = themeColor;
        document.head.appendChild(meta);
      } else {
        metaThemeColors.forEach((meta) => meta.setAttribute("content", themeColor));
      }

      let appleStatusBar = document.querySelector<HTMLMetaElement>(
        'meta[name="apple-mobile-web-app-status-bar-style"]',
      );

      if (!appleStatusBar) {
        appleStatusBar = document.createElement("meta");
        appleStatusBar.name = "apple-mobile-web-app-status-bar-style";
        document.head.appendChild(appleStatusBar);
      }

      appleStatusBar.content = theme === "dark" ? "black-translucent" : "default";
      document.documentElement.style.colorScheme = theme;
      document.documentElement.style.backgroundColor = themeColor;
      document.body.style.backgroundColor = themeColor;
    };

    const syncNavbarState = () => {
      const atTop = window.scrollY < 64;
      setIsAtTop(atTop);

      if (!enabled) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
      const activeSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom > probeY;
        }) ||
        sections.find((section) => section.getBoundingClientRect().top > 0) ||
        sections[sections.length - 1];

      const theme = activeSection?.dataset.navbarTheme === "dark" ? "dark" : "light";
      const themeColor =
        activeSection?.dataset.themeColor || (theme === "dark" ? "#050505" : "#f5f5f7");

      setActiveTheme(theme);
      updateThemeMeta(theme, themeColor);
    };

    syncNavbarState();
    window.addEventListener("scroll", syncNavbarState, { passive: true });
    window.addEventListener("resize", syncNavbarState);

    return () => {
      window.removeEventListener("scroll", syncNavbarState);
      window.removeEventListener("resize", syncNavbarState);
    };
  }, [defaultTheme, enabled, probeY, sectionSelector, syncThemeMeta]);

  return { activeTheme, isAtTop };
}

export function Navbar({
  brand,
  logo,
  logoWidths,
  links = [],
  menu,
  cta,
  actions,
  rightSlot,
  mobileFooterSlot,
  className,
  style,
  panelClassName,
  panelVisible,
  linkComponent: LinkComponent = DefaultLink,
  theme = "auto",
  defaultTheme = "light",
  syncThemeMeta = true,
  sectionSelector,
  probeY,
  glassEffect,
  glassRealisticStrategy,
  mobileMenuLabel = "Open menu",
  mobileMenuCloseLabel = "Close menu",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = React.useState(false);
  const { activeTheme, isAtTop } = useActiveNavbarTheme({
    enabled: theme === "auto",
    defaultTheme,
    syncThemeMeta,
    sectionSelector,
    probeY,
  });

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const resolvedTheme = theme === "auto" ? activeTheme : theme;
  const useDarkTheme = resolvedTheme === "dark";
  const showPanel = panelVisible ?? (mobileOpen || desktopMenuOpen || !isAtTop);
  const showPanelGlass = showPanel && !mobileOpen;

  const mobileOverlayVariants: Variants = {
    closed: { pointerEvents: "none" as const, transition: { duration: 0.48 } },
    open: { pointerEvents: "auto" as const, transition: { duration: 0 } },
  };
  const mobileBackgroundVariants: Variants = {
    closed: { height: 0, transition: { duration: 0.422, ease: mobileMenuEase } },
    open: { height: "100dvh", transition: { duration: 0.422, ease: mobileMenuEase } },
  };
  const mobileListVariants: Variants = {
    closed: { transition: { staggerChildren: 0.018, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.16, staggerChildren: 0.035 } },
  };
  const mobileItemVariants: Variants = {
    closed: { opacity: 0, y: -4, transition: { duration: 0.24, ease: mobileMenuEase } },
    open: { opacity: 1, y: 0, transition: { duration: 0.32, ease: mobileMenuEase } },
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileMenuOpen(false);
  };

  const navTextClass = useDarkTheme
    ? "text-white/70 hover:text-white"
    : "text-foreground/68 hover:text-foreground";
  const mobileMenuBackgroundClass = useDarkTheme ? "bg-[#090b10]" : "bg-[#f5f5f7]";
  const mobileMenuTextClass = useDarkTheme ? "text-white" : "text-[#1d1d1f]";
  const mobileMenuMutedClass = useDarkTheme ? "text-white/56" : "text-[#6e6e73]";
  const mobileMenuBorderClass = useDarkTheme ? "border-white/12" : "border-black/10";
  const navbarGlassOptions = {
    effect: glassEffect,
    realisticStrategy: glassRealisticStrategy,
  };

  const renderDesktopLink = (item: NavbarLinkItem) => (
    <NavbarLink
      key={item.href}
      {...item}
      href={item.href}
      linkComponent={LinkComponent}
      className={cn(
        navTextClass,
      )}
    />
  );

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-5 z-[1200]",
        "alka-navbar-root",
        useDarkTheme ? "alka-theme-dark" : "alka-theme-light",
        className,
      )}
      style={style}
    >
      <LiquidGlassFilter />
      <div
        data-panel-visible={showPanelGlass ? "true" : "false"}
        className="alka-navbar-shell relative z-20 mx-auto pt-0"
        onMouseLeave={() => setDesktopMenuOpen(false)}
      >
        <div
          data-quiet={showPanelGlass ? undefined : "true"}
          className={cn(
            "alka-navbar-panel alka-liquid-glass flex h-16 items-center justify-between gap-5 rounded-full border px-5 transition-[background-color,border-color,box-shadow,backdrop-filter,-webkit-backdrop-filter] duration-300 sm:gap-7 sm:px-8",
            mobileOpen
              ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
              : showPanel
                ? "border-[hsl(var(--alka-navbar-border))] bg-[hsl(var(--alka-navbar-bg))] shadow-[var(--alka-shadow-floating)] backdrop-blur-2xl"
                : "border-transparent bg-transparent shadow-none backdrop-blur-none",
            panelClassName,
          )}
        >
          <GlassElementLayers {...navbarGlassOptions} />
          <LinkComponent href="/" className="alka-navbar-brand flex min-w-0 items-center no-underline">
            <NavbarLogo logo={logo} brand={brand} widths={logoWidths} theme={resolvedTheme} />
          </LinkComponent>

          <div className="hidden items-center gap-2 md:flex">
            {menu ? (
              <button
                type="button"
                onClick={() => setDesktopMenuOpen((open) => !open)}
                onMouseEnter={() => setDesktopMenuOpen(true)}
                aria-expanded={desktopMenuOpen}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  desktopMenuOpen
                    ? useDarkTheme
                      ? "bg-white/10 text-white"
                      : "bg-black/[0.04] text-foreground"
                    : navTextClass,
                )}
              >
                {menu.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    desktopMenuOpen ? "rotate-180" : "",
                  )}
                  strokeWidth={2}
                />
              </button>
            ) : null}
            {links.map(renderDesktopLink)}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {cta ? (
              <NavbarCTA
                {...cta}
                href={cta.href}
                linkComponent={LinkComponent}
              />
            ) : null}
            {actions}
            {rightSlot}
          </div>

          <motion.button
            onClick={() => {
              if (mobileOpen) closeMobileMenu();
              else requestAnimationFrame(() => setMobileOpen(true));
            }}
            aria-label={mobileOpen ? mobileMenuCloseLabel : mobileMenuLabel}
            aria-expanded={mobileOpen}
            animate={{ scale: mobileOpen ? 1.02 : 1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.32, ease: mobileMenuEase }}
            className={cn(
              "flex h-10 w-10 items-center justify-center text-current transition-colors duration-300 md:hidden",
              useDarkTheme ? "text-white" : "text-foreground",
            )}
          >
            <span className="relative block h-5 w-5" aria-hidden="true">
              <motion.span
                className="absolute left-1/2 top-1/2 h-px w-[18px] origin-center -translate-x-1/2 rounded-full bg-current"
                animate={{ y: mobileOpen ? 0 : -3, rotate: mobileOpen ? 45 : 0 }}
                transition={{ duration: 0.32, ease: mobileMenuEase }}
              />
              <motion.span
                className="absolute left-1/2 top-1/2 h-px w-[18px] origin-center -translate-x-1/2 rounded-full bg-current"
                animate={{ y: mobileOpen ? 0 : 3, rotate: mobileOpen ? -45 : 0 }}
                transition={{ duration: 0.32, ease: mobileMenuEase }}
              />
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {menu && desktopMenuOpen ? (
            <motion.div
              initial={{ y: -8, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -8, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "alka-liquid-glass absolute left-4 right-4 top-[4.75rem] hidden rounded-[2rem] border p-3 md:block sm:left-6 sm:right-6 lg:left-8 lg:right-8",
                useDarkTheme ? "border-white/10 bg-[#0b0b0b]/[0.92]" : "border-black/[0.08] bg-white/[0.94]",
              )}
              onMouseEnter={() => setDesktopMenuOpen(true)}
            >
              <GlassElementLayers {...navbarGlassOptions} />
              <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr]">
                <div className={cn("rounded-[1.5rem] p-4", useDarkTheme ? "bg-white/[0.04]" : "bg-black/[0.025]")}>
                  {menu.eyebrow ? (
                    <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.16em]", useDarkTheme ? "text-white/45" : "text-muted-foreground")}>
                      {menu.eyebrow}
                    </p>
                  ) : null}
                  <div className="mt-4 grid gap-3">
                    {menu.items.map((item) => {
                      return (
                        <NavbarMenuItem
                          key={item.href}
                          {...item}
                          href={item.href}
                          linkComponent={LinkComponent}
                          theme={resolvedTheme}
                          onClick={() => {
                            setDesktopMenuOpen(false);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 p-4">
                  <div>
                    {menu.eyebrow ? (
                      <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.16em]", useDarkTheme ? "text-white/45" : "text-muted-foreground")}>
                        {menu.eyebrow}
                      </p>
                    ) : null}
                    {menu.title ? (
                      <h3 className={cn("mt-4 max-w-md text-3xl font-semibold leading-tight", useDarkTheme ? "text-white" : "text-foreground")}>
                        {menu.title}
                      </h3>
                    ) : null}
                    {menu.description ? (
                      <p className={cn("mt-4 max-w-lg text-sm leading-relaxed", useDarkTheme ? "text-white/58" : "text-muted-foreground")}>
                        {menu.description}
                      </p>
                    ) : null}
                  </div>

                  {menu.secondaryItems?.length ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {menu.secondaryItems.map((item) => {
                        return (
                          <NavbarMenuSecondaryItem
                            key={item.href}
                            {...item}
                            href={item.href}
                            linkComponent={LinkComponent}
                            theme={resolvedTheme}
                            onClick={() => {
                              setDesktopMenuOpen(false);
                            }}
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileOverlayVariants}
            className={cn("alka-navbar-mobile-overlay fixed inset-0 z-10 overflow-y-auto px-8 pb-10 pt-28 md:hidden", mobileMenuTextClass)}
          >
            <motion.div
              aria-hidden="true"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileBackgroundVariants}
              style={{ willChange: "height" }}
              className={cn("alka-navbar-mobile-background fixed left-0 right-0 top-0 overflow-hidden shadow-[0_18px_42px_rgba(0,0,0,0.18)]", mobileMenuBackgroundClass)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileListVariants}
              className="alka-navbar-mobile-list relative mx-auto max-w-[520px]"
            >
              {menu ? (
                <motion.div variants={mobileItemVariants}>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    aria-expanded={mobileMenuOpen}
                    className="relative flex h-[50px] w-full items-center pr-12 text-left text-[26px] font-semibold leading-[1.2]"
                  >
                    <span>{menu.label}</span>
                    <span className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center">
                      <ChevronDown
                        className={cn("h-6 w-6 transition-transform duration-500 ease-out", mobileMenuOpen ? "rotate-180" : "")}
                        strokeWidth={2.2}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileMenuOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: -4 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -4 }}
                        transition={{
                          height: { duration: 0.32, ease: mobileMenuEase },
                          opacity: { duration: 0.24, ease: mobileMenuEase },
                          y: { duration: 0.32, ease: mobileMenuEase },
                        }}
                        className="overflow-hidden"
                      >
                        <div className={cn("space-y-1 pb-2 pt-3", mobileMenuMutedClass)}>
                          {menu.items.map((item) => (
                            <LinkComponent
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                closeMobileMenu();
                                item.onSelect?.();
                              }}
                              className="block rounded-xl px-1 py-2 text-[1.02rem] font-semibold leading-tight no-underline transition-colors hover:text-current"
                            >
                              {item.label}
                            </LinkComponent>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              ) : null}

              {links.map((item) => (
                <motion.div key={item.href} variants={mobileItemVariants}>
                  <LinkComponent
                    href={item.href}
                    onClick={() => {
                      closeMobileMenu();
                      item.onSelect?.();
                    }}
                    className="flex h-[50px] items-center text-[26px] font-semibold leading-[1.2] no-underline"
                  >
                    {item.label}
                  </LinkComponent>
                </motion.div>
              ))}

              {cta || mobileFooterSlot ? (
                <motion.div variants={mobileItemVariants} className={cn("mt-8 flex items-center justify-between gap-3 border-t pt-5", mobileMenuBorderClass)}>
                  {cta ? (
                    <NavbarCTA
                      {...cta}
                      href={cta.href}
                      linkComponent={LinkComponent}
                      onClick={() => {
                        closeMobileMenu();
                      }}
                      className="text-[13px]"
                    />
                  ) : null}
                  {mobileFooterSlot}
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}

export const SectionAwareNavbar = Navbar;

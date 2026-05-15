"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export type CommandPaletteItem = {
  key: string;
  title: string;
  keywords?: string[];
  icon?: LucideIcon;
  shortcut?: string;
  onSelect: () => void | Promise<void>;
};

export type CommandPaletteGroup = {
  heading: string;
  items: CommandPaletteItem[];
};

type CommandPaletteContextValue = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

export type CommandPaletteProviderProps = {
  children: React.ReactNode;
  groups: CommandPaletteGroup[];
  placeholder?: string;
  emptyLabel?: string;
  shortcutKey?: string;
};

export function CommandPaletteProvider({
  children,
  groups,
  placeholder = "Search commands...",
  emptyLabel = "No results found.",
  shortcutKey = "k",
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcutKey.toLowerCase()) {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcutKey]);

  const api = React.useMemo<CommandPaletteContextValue>(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((value) => !value),
    }),
    [],
  );

  const runItem = React.useCallback(async (item: CommandPaletteItem) => {
    await item.onSelect();
    setIsOpen(false);
  }, []);

  return (
    <CommandPaletteContext.Provider value={api}>
      {children}
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyLabel}</CommandEmpty>
          {groups.map((group, index) => (
            <React.Fragment key={group.heading}>
              {index > 0 ? <CommandSeparator /> : null}
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.key}
                      value={[item.title, ...(item.keywords ?? [])].join(" ")}
                      onSelect={() => void runItem(item)}
                    >
                      {Icon ? <Icon className="mr-2 size-4" /> : null}
                      <span>{item.title}</span>
                      {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = React.useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  }
  return context;
}

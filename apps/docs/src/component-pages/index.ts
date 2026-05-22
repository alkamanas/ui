import * as React from "react";

import type { ComponentPageComponent } from "./shared";

export type LazyComponentPageComponent = React.LazyExoticComponent<ComponentPageComponent>;

function lazyComponentPage(
  loader: () => Promise<Record<string, ComponentPageComponent>>,
  exportName: string,
): LazyComponentPageComponent {
  return React.lazy(() =>
    loader().then((module) => ({
      default: module[exportName],
    })),
  );
}

export const componentPageById: Record<string, LazyComponentPageComponent> = {
  "accordion": lazyComponentPage(() => import("./accordion"), "AccordionPage"),
  "alert-dialog": lazyComponentPage(() => import("./alert-dialog"), "AlertDialogPage"),
  "avatar": lazyComponentPage(() => import("./avatar"), "AvatarPage"),
  "badge": lazyComponentPage(() => import("./badge"), "BadgePage"),
  "breadcrumb": lazyComponentPage(() => import("./breadcrumb"), "BreadcrumbPage"),
  "button": lazyComponentPage(() => import("./button"), "ButtonPage"),
  "button-group": lazyComponentPage(() => import("./button-group"), "ButtonGroupPage"),
  "calendar": lazyComponentPage(() => import("./calendar"), "CalendarPage"),
  "card": lazyComponentPage(() => import("./card"), "CardPage"),
  "carousel": lazyComponentPage(() => import("./carousel"), "CarouselPage"),
  "checkbox": lazyComponentPage(() => import("./checkbox"), "CheckboxPage"),
  "collapsible": lazyComponentPage(() => import("./collapsible"), "CollapsiblePage"),
  "combobox": lazyComponentPage(() => import("./combobox"), "ComboboxPage"),
  "command": lazyComponentPage(() => import("./command"), "CommandPage"),
  "context-menu": lazyComponentPage(() => import("./context-menu"), "ContextMenuPage"),
  "data-table": lazyComponentPage(() => import("./data-table"), "DataTablePage"),
  "date-picker": lazyComponentPage(() => import("./date-picker"), "DatePickerPage"),
  "dialog": lazyComponentPage(() => import("./dialog"), "DialogPage"),
  "direction": lazyComponentPage(() => import("./direction"), "DirectionPage"),
  "drawer": lazyComponentPage(() => import("./drawer"), "DrawerPage"),
  "dropdown-menu": lazyComponentPage(() => import("./dropdown-menu"), "DropdownMenuPage"),
  "input": lazyComponentPage(() => import("./input"), "InputPage"),
  "input-group": lazyComponentPage(() => import("./input-group"), "InputGroupPage"),
  "input-otp": lazyComponentPage(() => import("./input-otp"), "InputOTPPage"),
  "item": lazyComponentPage(() => import("./item"), "ItemPage"),
  "kbd": lazyComponentPage(() => import("./kbd"), "KbdPage"),
  "label": lazyComponentPage(() => import("./label"), "LabelPage"),
  "menubar": lazyComponentPage(() => import("./menubar"), "MenubarPage"),
  "navbar": lazyComponentPage(() => import("./navbar"), "NavbarPage"),
  "popover": lazyComponentPage(() => import("./popover"), "PopoverPage"),
  "progress": lazyComponentPage(() => import("./progress"), "ProgressPage"),
  "radio-group": lazyComponentPage(() => import("./radio-group"), "RadioGroupPage"),
  "scroll-area": lazyComponentPage(() => import("./scroll-area"), "ScrollAreaPage"),
  "select": lazyComponentPage(() => import("./select"), "SelectPage"),
  "separator": lazyComponentPage(() => import("./separator"), "SeparatorPage"),
  "sheet": lazyComponentPage(() => import("./sheet"), "SheetPage"),
  "sidebar": lazyComponentPage(() => import("./sidebar"), "SidebarPage"),
  "slider": lazyComponentPage(() => import("./slider"), "SliderPage"),
  "spinner": lazyComponentPage(() => import("./spinner"), "SpinnerPage"),
  "switch": lazyComponentPage(() => import("./switch"), "SwitchPage"),
  "tabs": lazyComponentPage(() => import("./tabs"), "TabsPage"),
  "textarea": lazyComponentPage(() => import("./textarea"), "TextareaPage"),
  "toast": lazyComponentPage(() => import("./toast"), "ToastPage"),
  "toggle": lazyComponentPage(() => import("./toggle"), "TogglePage"),
  "toggle-group": lazyComponentPage(() => import("./toggle-group"), "ToggleGroupPage"),
  "tooltip": lazyComponentPage(() => import("./tooltip"), "TooltipPage"),
  "flip-card": lazyComponentPage(() => import("./flip-card"), "FlipCardPage"),
  "image-card": lazyComponentPage(() => import("./image-card"), "ImageCardPage"),
};

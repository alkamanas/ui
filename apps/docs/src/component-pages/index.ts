import { AccordionPage } from "./accordion";
import { AlertDialogPage } from "./alert-dialog";
import { AvatarPage } from "./avatar";
import { BadgePage } from "./badge";
import { BreadcrumbPage } from "./breadcrumb";
import { ButtonPage } from "./button";
import { ButtonGroupPage } from "./button-group";
import { CardPage } from "./card";
import { CarouselPage } from "./carousel";
import { CheckboxPage } from "./checkbox";
import { CollapsiblePage } from "./collapsible";
import { ComboboxPage } from "./combobox";
import { CommandPage } from "./command";
import { ContextMenuPage } from "./context-menu";
import { DialogPage } from "./dialog";
import { DirectionPage } from "./direction";
import { DrawerPage } from "./drawer";
import { DropdownMenuPage } from "./dropdown-menu";
import { InputPage } from "./input";
import { InputGroupPage } from "./input-group";
import { InputOTPPage } from "./input-otp";
import { ItemPage } from "./item";
import { KbdPage } from "./kbd";
import { LabelPage } from "./label";
import { MenubarPage } from "./menubar";
import { NavbarPage } from "./navbar";
import { PopoverPage } from "./popover";
import { ProgressPage } from "./progress";
import { RadioGroupPage } from "./radio-group";
import { ScrollAreaPage } from "./scroll-area";
import { SelectPage } from "./select";
import { SeparatorPage } from "./separator";
import { SheetPage } from "./sheet";
import { SidebarPage } from "./sidebar";
import { SliderPage } from "./slider";
import { SpinnerPage } from "./spinner";
import { SwitchPage } from "./switch";
import { TabsPage } from "./tabs";
import { TextareaPage } from "./textarea";
import { ToastPage } from "./toast";
import { TogglePage } from "./toggle";
import { ToggleGroupPage } from "./toggle-group";
import { TooltipPage } from "./tooltip";
import { FlipCardPage } from "./flip-card";
import type { ComponentPageComponent } from "./shared";

export const componentPageById: Record<string, ComponentPageComponent> = {
  "accordion": AccordionPage,
  "alert-dialog": AlertDialogPage,
  "avatar": AvatarPage,
  "badge": BadgePage,
  "breadcrumb": BreadcrumbPage,
  "button": ButtonPage,
  "button-group": ButtonGroupPage,
  "card": CardPage,
  "carousel": CarouselPage,
  "checkbox": CheckboxPage,
  "collapsible": CollapsiblePage,
  "combobox": ComboboxPage,
  "command": CommandPage,
  "context-menu": ContextMenuPage,
  "dialog": DialogPage,
  "direction": DirectionPage,
  "drawer": DrawerPage,
  "dropdown-menu": DropdownMenuPage,
  "input": InputPage,
  "input-group": InputGroupPage,
  "input-otp": InputOTPPage,
  "item": ItemPage,
  "kbd": KbdPage,
  "label": LabelPage,
  "menubar": MenubarPage,
  "navbar": NavbarPage,
  "popover": PopoverPage,
  "progress": ProgressPage,
  "radio-group": RadioGroupPage,
  "scroll-area": ScrollAreaPage,
  "select": SelectPage,
  "separator": SeparatorPage,
  "sheet": SheetPage,
  "sidebar": SidebarPage,
  "slider": SliderPage,
  "spinner": SpinnerPage,
  "switch": SwitchPage,
  "tabs": TabsPage,
  "textarea": TextareaPage,
  "toast": ToastPage,
  "toggle": TogglePage,
  "toggle-group": ToggleGroupPage,
  "tooltip": TooltipPage,
  "flip-card": FlipCardPage,
};

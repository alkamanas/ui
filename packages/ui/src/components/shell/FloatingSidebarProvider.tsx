import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export type SidebarState = "expanded" | "collapsed";

export interface FloatingSidebarContextValue {
  state: SidebarState;
  setState: (s: SidebarState) => void;
  toggle: () => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const FloatingSidebarContext =
  createContext<FloatingSidebarContextValue | null>(null);

export const FloatingSidebarProvider: React.FC<{
  children: React.ReactNode;
  defaultState?: SidebarState;
}> = ({ children, defaultState = "expanded" }) => {
  const [state, setState] = useState<SidebarState>(defaultState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const toggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen((v) => !v);
    } else {
      setState((s) => (s === "expanded" ? "collapsed" : "expanded"));
    }
  }, [isMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <FloatingSidebarContext.Provider
      value={{
        state,
        setState,
        toggle,
        isMobile,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </FloatingSidebarContext.Provider>
  );
};

export const useFloatingSidebar = (): FloatingSidebarContextValue => {
  const ctx = useContext(FloatingSidebarContext);
  if (!ctx) {
    throw new Error(
      "useFloatingSidebar must be used inside FloatingSidebarProvider",
    );
  }
  return ctx;
};

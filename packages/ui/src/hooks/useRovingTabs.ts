import { useCallback, useRef, type KeyboardEvent } from "react";

export interface RovingTabItem {
  id: string;
  disabled?: boolean;
}

export interface UseRovingTabsOptions<T extends RovingTabItem> {
  tabs: readonly T[];
  onSelect: (tabId: string) => void;
}

/**
 * Provides the shared keyboard and focus behavior for tab lists that use a
 * roving tab index. Disabled tabs are omitted from keyboard navigation.
 */
export function useRovingTabs<T extends RovingTabItem>({
  tabs,
  onSelect,
}: UseRovingTabsOptions<T>) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const focusTab = useCallback((tabId: string) => {
    tabRefs.current.get(tabId)?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, tabId: string) => {
      const enabledTabs = tabs.filter((tab) => !tab.disabled);
      const currentIndex = enabledTabs.findIndex((tab) => tab.id === tabId);

      if (currentIndex === -1 || enabledTabs.length === 0) {
        return;
      }

      let nextIndex: number | undefined;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % enabledTabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex =
            (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = enabledTabs.length - 1;
          break;
        default:
          return;
      }

      const nextTab = enabledTabs[nextIndex];
      if (!nextTab) {
        return;
      }

      event.preventDefault();
      onSelect(nextTab.id);
      queueMicrotask(() => focusTab(nextTab.id));
    },
    [focusTab, onSelect, tabs],
  );

  const setTabRef = useCallback(
    (tabId: string, element: HTMLButtonElement | null) => {
      if (element) {
        tabRefs.current.set(tabId, element);
      } else {
        tabRefs.current.delete(tabId);
      }
    },
    [],
  );

  return { handleKeyDown, setTabRef };
}

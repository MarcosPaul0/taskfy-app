import { useCallback, useState } from "react";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const change = useCallback((currentIsOpen: boolean) => {
    setIsOpen(currentIsOpen);
  }, []);

  return {
    isOpen,
    open,
    close,
    change,
  };
}

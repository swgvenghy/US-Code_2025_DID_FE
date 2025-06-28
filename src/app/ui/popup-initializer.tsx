"use client";

import { useEffect } from "react";
import { usePopupStore } from "../store/store/popup.store";

interface PopupInitializerProps {
  initial: boolean;
}

export default function PopupInitializer({ initial }: PopupInitializerProps) {
  const setPopup = usePopupStore((s) => s.setPopup);

  useEffect(() => {
    setPopup(initial);
  }, [initial, setPopup]);

  return null;
}

"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#4A403A",
          color: "#FDFBF6",
          fontFamily: "var(--font-montserrat)",
        },
        success: {
          iconTheme: {
            primary: "#2A5B4F",
            secondary: "#FDFBF6",
          },
        },
        error: {
          iconTheme: {
            primary: "#8C484E",
            secondary: "#FDFBF6",
          },
        },
      }}
    />
  );
}

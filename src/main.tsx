import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./quest.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// רישום Service Worker כדי שהאפליקציה המותקנת תעבוד גם אופליין
const isLocalhost =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
if ("serviceWorker" in navigator && window.location.protocol.startsWith("http") && !isLocalhost) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // אם הרישום נכשל (למשל בתצוגה מקדימה) — המשחק עדיין עובד רגיל
    });
  });
}

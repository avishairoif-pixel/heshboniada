import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** גרסת השולחן (Electron) חושפת דגל דרך ה-preload */
export function isDesktopApp(): boolean {
  if (typeof window === "undefined") return false;
  return (window as Window & { cheshboniada?: { isDesktop?: boolean } }).cheshboniada?.isDesktop === true;
}

function detectInstalled(): boolean {
  if (typeof window === "undefined") return false;
  // באפליקציית השולחן המשחק ממילא "מותקן" — אין מה להציע
  if (isDesktopApp()) return true;
  const standalone =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return standalone || document.referrer.startsWith("android-app://");
}

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(detectInstalled);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferred) return false;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") {
        setDeferred(null);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [deferred]);

  return { canInstall: deferred !== null, isInstalled, promptInstall };
}

export function InstallModal({
  canInstall,
  isInstalled,
  onInstall,
  onClose,
}: {
  canInstall: boolean;
  isInstalled: boolean;
  onInstall: () => void;
  onClose: () => void;
}) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="התקנת האפליקציה">
      <div className="panel install-panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" type="button" onClick={onClose} aria-label="סגירה">
          ×
        </button>
        <img className="install-icon" src="icons/app-icon-512.png" alt="אייקון החשבוניאדה" />
        <h2>📲 התקיני את החשבוניאדה!</h2>
        <p className="panel-sub">
          {isInstalled
            ? "האפליקציה כבר מותקנת על המכשיר — אפשר לשחק ממסך הבית, גם בלי אינטרנט! 🦄"
            : "המשחק הופך לאפליקציה אמיתית על מסך הבית — עם אייקון, מסך מלא ועבודה אופליין!"}
        </p>

        {!isInstalled && canInstall && (
          <div className="panel-actions">
            <button className="btn-primary big" type="button" onClick={onInstall}>
              התקנה בלחיצה אחת! 📲
            </button>
          </div>
        )}

        {!isInstalled && (
          <div className="install-steps">
            <b>🤖 אנדרואיד (כרום):</b>
            <ol>
              <li>לחצי על תפריט שלוש הנקודות <b>⋮</b> למעלה</li>
              <li>בחרי <b>״הוספה למסך הבית״</b> או <b>״התקנת אפליקציה״</b></li>
              <li>אשרי — והאייקון 🦄 יופיע על מסך הבית!</li>
            </ol>
            <b>🍎 אייפון (ספארי):</b>
            <ol>
              <li>לחצי על כפתור השיתוף ⎙ למטה</li>
              <li>בחרי <b>״הוספה למסך הבית״</b></li>
              <li>אשרי — ויש לך אפליקציה!</li>
            </ol>
          </div>
        )}

        <div className="panel-actions">
          <button className="btn-ghost" type="button" onClick={onClose}>
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
}

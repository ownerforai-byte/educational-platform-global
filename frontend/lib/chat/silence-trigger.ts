/**
 * Silence trigger for hands-free voice: `poke()` on every speech event re-arms
 * a timer; when `ms` pass with no poke, `onSilence` fires once.
 */
export const VOICE_AUTO_SEND_MS = 3500;

export interface SilenceTrigger {
  poke: () => void;
  cancel: () => void;
}

export function createSilenceTrigger(ms: number, onSilence: () => void): SilenceTrigger {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  return {
    poke() {
      cancel();
      timer = setTimeout(() => {
        timer = null;
        onSilence();
      }, ms);
    },
    cancel,
  };
}

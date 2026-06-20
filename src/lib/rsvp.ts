/**
 * RSVP submission abstraction.
 *
 * Currently client-side only: responses are validated, then stored in
 * localStorage and logged. When you build the response-collection backend,
 * replace the body of `submitRsvp` with a fetch to your API/database —
 * this is the ONLY file you need to touch.
 *
 * Example future implementation:
 *
 *   const res = await fetch("/api/rsvp", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) throw new Error("Failed to submit RSVP");
 *   return { ok: true };
 */

export type RsvpPayload = {
  name: string;
  email: string;
  attending: "yes" | "no";
  guestCount: number;
  meal: string;
  message?: string;
  submittedAt: string;
};

export type RsvpResult = { ok: true } | { ok: false; error: string };

const STORAGE_KEY = "wedding-rsvp-submissions";

export async function submitRsvp(
  data: Omit<RsvpPayload, "submittedAt">
): Promise<RsvpResult> {
  const payload: RsvpPayload = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  // Simulate a brief network round-trip for a polished UX.
  await new Promise((resolve) => setTimeout(resolve, 900));

  try {
    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      const list: RsvpPayload[] = existing ? JSON.parse(existing) : [];
      list.push(payload);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    // Visible in the console for now — swap for a real backend later.
    console.info("[RSVP] received:", payload);
    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't save your response. Please try again." };
  }
}

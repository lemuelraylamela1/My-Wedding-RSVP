export type RsvpSubmitPayload = {
  token: string;
  name: string;
  email: string;
  attending: "yes" | "no";
  guestCount: number;
  meal: string;
  message?: string;
};

export type RsvpResult = { ok: true } | { ok: false; error: string };

const plannerApiUrl = (
  process.env.NEXT_PUBLIC_PLANNER_API_URL ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000")
).replace(/\/+$/, "");

if (typeof window !== "undefined" && process.env.NODE_ENV === "production" && !plannerApiUrl) {
  console.error("[RSVP] NEXT_PUBLIC_PLANNER_API_URL is not configured.");
}

export interface InvitationProfile {
  guest: {
    displayName: string;
    email: string | null;
    plusOneAllowed: boolean;
  };
  wedding: {
    title: string;
    coupleNames: string;
  };
  rsvp: {
    invitationStatus: "NOT_SENT" | "SENT";
    rsvpStatus: "PENDING" | "ACCEPTED" | "DECLINED" | "TENTATIVE";
  };
}

async function parseError(response: Response, fallback: string) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error || fallback;
  } catch {
    return fallback;
  }
}

export async function getInvitationProfile(token: string): Promise<{ ok: true; data: InvitationProfile } | { ok: false; error: string }> {
  if (!token) {
    return { ok: false, error: "Missing invitation token." };
  }
  if (!plannerApiUrl) {
    return { ok: false, error: "RSVP is not connected to PlanMyDay yet." };
  }
  try {
    const response = await fetch(`${plannerApiUrl}/api/public/rsvp?token=${encodeURIComponent(token)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      const message = await parseError(response, "This invitation link is invalid or expired.");
      return { ok: false, error: message };
    }
    const data = (await response.json()) as InvitationProfile;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Could not load invitation details. Please try again." };
  }
}

export async function submitRsvp(payload: RsvpSubmitPayload): Promise<RsvpResult> {
  if (!plannerApiUrl) {
    return { ok: false, error: "RSVP is not connected to PlanMyDay yet." };
  }
  try {
    const response = await fetch(`${plannerApiUrl}/api/public/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: payload.token,
        email: payload.email,
        attending: payload.attending,
        guestCount: payload.guestCount,
        meal: payload.meal,
        message: payload.message,
      }),
    });

    if (!response.ok) {
      const message = await parseError(response, "We couldn't save your response. Please try again.");
      return { ok: false, error: message };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't save your response. Please try again." };
  }
}

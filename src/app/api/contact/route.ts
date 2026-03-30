import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  timeline?: string;
  details?: string;
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowedOrigin = new URL(siteConfig.url).origin;
  const requestOrigin = new URL(request.url).origin;

  if (origin) {
    return origin === requestOrigin || origin === allowedOrigin;
  }

  if (referer) {
    return (
      referer.startsWith(requestOrigin) || referer.startsWith(allowedOrigin)
    );
  }

  return true;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "This form can only be submitted from the Codeique website." },
      { status: 403 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "We couldn't read that submission. Please try again." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const service = payload.service?.trim() ?? "";
  const timeline = payload.timeline?.trim() ?? "";
  const details = payload.details?.trim() ?? "";
  const honeypot = payload.website?.trim() ?? "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Please enter the name you'd like us to reply to." },
      { status: 422 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  if (details.length < 20) {
    return NextResponse.json(
      {
        error:
          "Please add a bit more project detail so we can respond properly.",
      },
      { status: 422 },
    );
  }

  console.info("[contact] Inquiry received", {
    name,
    email,
    company,
    service,
    timeline,
    details,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "__session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 5;

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    if (!adminAuth) {
      return NextResponse.json(
        { error: "Firebase Admin not configured" },
        { status: 500 }
      );
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userEmail = (decoded as { email?: string }).email;

    const allowedEmailsRaw = process.env.ADMIN_EMAILS ?? "";
    if (allowedEmailsRaw) {
      const allowedEmails = allowedEmailsRaw
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      if (allowedEmails.length > 0) {
        const normalizedUser = userEmail?.trim().toLowerCase() ?? "";
        if (!userEmail || !allowedEmails.includes(normalizedUser)) {
          return NextResponse.json(
            { error: "등록된 관리자 이메일이 아닙니다." },
            { status: 403 }
          );
        }
      }
    }

    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn: SESSION_MAX_AGE * 1000,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE_NAME);
  return res;
}

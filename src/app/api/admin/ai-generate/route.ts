import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { generateContent, type GenerateType } from "@/lib/openai/client";

const SESSION_COOKIE_NAME = "__session";

async function verifyAuth(request: NextRequest): Promise<boolean> {
  if (process.env.NEXT_PUBLIC_USE_FIREBASE !== "true") {
    return true;
  }
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return false;
  if (!adminAuth) return false;
  try {
    await adminAuth.verifySessionCookie(sessionCookie);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await verifyAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { type, prompt, context } = body as {
      type: GenerateType;
      prompt: string;
      context?: Record<string, string>;
    };
    if (!type || !prompt) {
      return NextResponse.json(
        { error: "Missing type or prompt" },
        { status: 400 }
      );
    }

    const content = await generateContent(type, prompt, context);
    return NextResponse.json({ content });
  } catch (err) {
    console.error("AI generate error:", err);
    return NextResponse.json(
      { error: "생성에 실패했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

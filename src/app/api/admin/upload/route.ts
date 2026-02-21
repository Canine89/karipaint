import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import sharp from "sharp";
import { getStorage } from "firebase-admin/storage";
import { adminApp, adminAuth } from "@/lib/firebase/admin";

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 82;

const SESSION_COOKIE_NAME = "__session";

const IS_DEPLOYED =
  process.env.VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "preview";

async function verifyAuth(): Promise<boolean> {
  const requireAuth =
    IS_DEPLOYED || process.env.NEXT_PUBLIC_USE_FIREBASE === "true";
  if (!requireAuth) return true;
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
  const isAuth = await verifyAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!adminApp) {
    return NextResponse.json(
      { error: "Firebase not configured" },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !file.size) {
      return NextResponse.json(
        { error: "이미지 파일을 선택해주세요." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "jpg, png, webp, gif만 업로드 가능합니다." },
        { status: 400 }
      );
    }

    const storage = getStorage(adminApp);
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const bucket = storage.bucket(bucketName || undefined);

    let buffer = Buffer.from(await file.arrayBuffer());
    let contentType = file.type;
    let ext = "webp";

    if (file.type !== "image/gif") {
      try {
        const pipeline = sharp(buffer)
          .resize(MAX_WIDTH, undefined, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .webp({ quality: WEBP_QUALITY });
        buffer = Buffer.from(await pipeline.toBuffer());
        contentType = "image/webp";
        ext = "webp";
      } catch {
        ext = file.name.split(".").pop() || "jpg";
      }
    } else {
      ext = "gif";
    }

    const filename = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const storageFile = bucket.file(filename);

    await storageFile.save(buffer, {
      metadata: { contentType },
      predefinedAcl: "publicRead",
    });

    const baseUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ url: baseUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "이미지 업로드에 실패했습니다." },
      { status: 500 }
    );
  }
}

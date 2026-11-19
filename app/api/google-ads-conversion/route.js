import { NextResponse } from "next/server";
import { uploadGoogleAdsClickConversion } from "@/utils/googleAdsConversions";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON submission." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ success: false, message: "Invalid conversion submission." }, { status: 400 });
  }
  try {
    const result = await uploadGoogleAdsClickConversion(body);

    return NextResponse.json(result, {
      status: result.success || result.skipped ? 200 : 400,
    });
  } catch (error) {
    console.error("Google Ads conversion upload failed:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown Google Ads conversion error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { toErrorMessage } from "@/lib/errorHandler";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { query?: string };
    const query = body.query?.trim() ?? "";

    if (!query) {
      return NextResponse.json({ success: false, error: "Missing query" }, { status: 400 });
    }

    // Placeholder: wire to real AI provider later (Groq/OpenAI/etc).
    return NextResponse.json({
      success: true,
      data: {
        query,
        intent: "glass_recommendation",
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: toErrorMessage(err, "Search failed") }, { status: 500 });
  }
}


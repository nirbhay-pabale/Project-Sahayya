import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter" },
      { status: 400 }
    );
  }

  try {
    // Robust URL cleaning to strip accidental redundant http:// or https:// prefixes
    let raw = url.trim();
    raw = raw.replace(/^(https?:\/\/)+/gi, "");
    raw = raw.replace(/\/+$/, "");
    const targetUrl = `http://${raw}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Camera fetch failed with status ${res.status}: ${res.statusText}` },
        { status: res.status }
      );
    }

    const blob = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (err: any) {
    console.error("[CameraProxy Error]:", err);
    return NextResponse.json(
      { error: err.message || "Failed to reach camera IP address" },
      { status: 500 }
    );
  }
}

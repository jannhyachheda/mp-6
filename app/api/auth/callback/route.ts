import { getAccessToken, getGitHubUser } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    const accessToken = await getAccessToken(code);
    const user = await getGitHubUser(accessToken);

    const response = NextResponse.redirect(new URL("/", request.url));
    
    response.cookies.set("github_user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}

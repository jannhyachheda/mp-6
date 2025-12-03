import { cookies } from "next/headers";
import { GitHubUser } from "@/types";
import UserProfile from "@/components/UserProfile";
import { getGitHubAuthUrl } from "@/lib/github";

export default async function Home() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("github_user");
  
  let user: GitHubUser | null = null;
  
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }

  const githubAuthUrl = getGitHubAuthUrl();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-amber-100 to-amber-50">
      {user ? (
        <UserProfile user={user} />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-amber-900">MP6</h1>
          <a
            href={githubAuthUrl}
            className="px-8 py-4 bg-amber-800 text-amber-50 rounded-lg hover:bg-amber-900 text-xl transition-colors shadow-lg"
          >
            Sign in with GitHub
          </a>
        </div>
      )}
    </main>
  );
}

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {user ? (
        <UserProfile user={user} />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">MP6</h1>
          <a
            href={githubAuthUrl}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-xl"
          >
            Sign in with GitHub
          </a>
        </div>
      )}
    </main>
  );
}

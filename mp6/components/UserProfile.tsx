"use client";

import { GitHubUser } from "@/types";

export default function UserProfile({ user }: { user: GitHubUser }) {
  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{user.name || user.login}</h2>
      <p className="text-gray-600 mb-2">@{user.login}</p>
      {user.email && (
        <p className="text-gray-600 mb-2">{user.email}</p>
      )}
      {user.bio && (
        <p className="text-gray-700 text-center mb-4">{user.bio}</p>
      )}
      <button
        onClick={handleSignOut}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export function getGitHubAuthUrl(): string {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT_URI;
  
  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri!,
    scope: "read:user user:email",
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function getAccessToken(code: string): Promise<string> {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export async function getGitHubUser(accessToken: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

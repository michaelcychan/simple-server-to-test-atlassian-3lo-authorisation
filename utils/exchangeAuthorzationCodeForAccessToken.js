export const exchangeAuthorzationCodeForAccessToken = async ({
  code,
  clientId,
  clientSecret,
}) => {
  // reference: https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/#2--exchange-authorization-code-for-access-token
  const body = JSON.stringify({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: "http://localhost:3000/callback",
  });

  const resp = await fetch("https://auth.atlassian.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if (!resp.ok) {
    throw new Error(
      `Failed to exchange authorization code for access token: ${resp.statusText}`,
    );
  }
  const data = await resp.json();
  console.log("Access Token Response", JSON.stringify(data, null, 2));
    // {
    //   "access_token": "<access_token>", // valid for 30 minutes
    //   "expires_in": 3600,
    //   "token_type": "Bearer",
    //   "refresh_token": "<refresh_token>", // valid for 90 days
    //   "scope": "<app_id>.<env_id>:read:download:custom <app_id>.<env_id>:read:feature:custom offline_access read:forge-app:jira"
    // }
  const {access_token: accessToken, refresh_token: refreshToken} = data;
  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);
  return {accessToken, refreshToken};
};

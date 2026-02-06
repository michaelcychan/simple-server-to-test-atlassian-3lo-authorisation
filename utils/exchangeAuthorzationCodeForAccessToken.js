
export const exchangeAuthorzationCodeForAccessToken = async ({code, clientId, clientSecret}) => {
  const resp = await fetch('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: 'http://localhost:3000/callback',
    }),
  });
  if (!resp.ok) {
    throw new Error(`Failed to exchange authorization code for access token: ${resp.statusText}`);
  }
  const data = await resp.json();
  console.log('Access Token Response', JSON.stringify(data, null, 2));
  return data.access_token;
}
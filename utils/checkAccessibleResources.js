export const checkAccessibleResources = async (accessToken) => {
  const resp = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error(`Failed to check accessible resources: ${resp.statusText}`);
  }
  return await resp.json();
}
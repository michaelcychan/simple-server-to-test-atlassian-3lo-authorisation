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

  // always empty, possibly a bug on Atlassian side, read the discussion on README.md
  const accessibleResources =  await resp.json();
  console.log('Accessible resources response:', accessibleResources);
  return accessibleResources;
}
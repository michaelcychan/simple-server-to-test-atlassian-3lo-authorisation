export const getCloudId = async (siteUrl) => {
  const resp = await fetch(`${siteUrl}/_edge/tenant_info`);
  if (!resp.ok) {
    throw new Error(`Failed to get cloud ID: ${resp.statusText}`);
  }
  const data = await resp.json();
  console.log('cloudId', data.cloudId);
  return data.cloudId;
}
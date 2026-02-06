import { callApi } from './callApi.js';

export const callApiWithSiteUrl = async ({
  siteUrl,
  accessToken,
  apiPath,
  appId,
  envId,
}) => {

  const url = `${siteUrl}/gateway/api/svc/jira/apps/${appId}_${envId}/${apiPath}`;
  return await callApi({url, accessToken});

}
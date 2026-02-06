import { callApi } from './callApi.js';

export const callApiWithCloudId = async ({
  cloudId,
  accessToken,
  apiPath,
  appId,
  envId,
}) => {
  const url = `https://api.atlassian.com/svc/jira/${cloudId}/apps/${appId}}_${envId}/${apiPath}`;

  return await callApi({url, accessToken});
};

import express from 'express';
import { getCloudId } from './utils/getCloudId.js';
import { exchangeAuthorzationCodeForAccessToken } from './utils/exchangeAuthorzationCodeForAccessToken.js';
import { checkAccessibleResources } from './utils/checkAccessibleResources.js';
import { callApiWithCloudId } from './utils/callApiWithCloudId.js';
import { callApiWithSiteUrl } from './utils/callApiWithSiteUrl.js';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';
const siteUrl = process.env.SITE_URL || '';
const appId = process.env.APP_ID || '';
const envId = process.env.ENV_ID || '';

const app = express()
const port = 3000

const apiPath = 'features';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// only works with the manually updated Authorization link, go to REAMDME for details
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  const {accessToken, refreshToken} = await exchangeAuthorzationCodeForAccessToken({code, clientId, clientSecret});
  await checkAccessibleResources(accessToken);

  // choose either of the below API calling methods (cloudId or siteUrl), 
  // both will work with the same access token

  // obtaining cloudId using siteUrl
  const cloudId = await getCloudId(siteUrl);
  // calling API using cloudId
  const apiCloudIdResponse = await callApiWithCloudId({
    cloudId,
    accessToken,
    apiPath,
    appId,
    envId
  });

  // calling API directly using siteUrl
  const apiSiteUrlResponse = await callApiWithSiteUrl({
    siteUrl,
    accessToken,
    apiPath,
    appId,
    envId
  })
  res.status(200).json({ success: true});
})

app.listen(port, () => {
  if (!clientId || !clientSecret || !siteUrl || !appId || !envId) {
    console.error('Please set CLIENT_ID, CLIENT_SECRET, and SITE_URL environment variables');
    process.exit(1);
  }
  console.log(`Example app listening on port ${port}`)
})
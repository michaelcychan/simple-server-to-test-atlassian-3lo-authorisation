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

app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  console.log('code received not empty:', code.trim().length > 0)
  const cloudId = await getCloudId(siteUrl);

  const accessToken = await exchangeAuthorzationCodeForAccessToken({code, clientId, clientSecret});
  console.log('Access token not empty:', accessToken.trim().length > 0);
  const accessibleResources = await checkAccessibleResources(accessToken);

  console.log('Accessible resources:', accessibleResources);
  const apiCloudIdResponse = await callApiWithCloudId({
    cloudId,
    accessToken,
    apiPath,
    appId,
    envId
  });
  const apiSiteUrlResponse = await callApiWithSiteUrl({
    siteUrl: siteUrl,
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
  console.log('UUID: ', crypto.randomUUID());
})
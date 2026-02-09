# Quick Server

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Requires `.env` file with CLIENT_ID, CLIENT_SECRET, SITE_URL, APP_ID and ENV_ID.

## Manual Fix

[Discussion](https://community.developer.atlassian.com/t/expose-forge-app-rest-apis-scope-does-not-match/98866/5?u=michaelchan)

The authorization URL provided by Atlassian in developer console is not complete. Additional persmissions needs to be added and the URL has to be changed manually.

For Jira app, additional permission `read:forge-app:jira` is needed. Add `%20read:forge-app:jira%20offline_access` to the end of the scope parameter for:

1. adding `read:forge-app:jira` permission
2. generating a refresh token which is valid for 90 days

URL should be updated as : `https://auth.atlassian.com/authorize?[something]scope=<customscopes>%20read:forge-app:jira%20offline_access[something]`

If you have added the offline_access scope to your authorization url, you will now get a refresh token when you exchange your authorization code for an access token:

```json
{
    "access_token": "...", // valid for 30 minutes
    "expires_in": 3600,
    "token_type": "Bearer",
    "refresh_token": "...", // valid for 90 days
    "scope": "..."
}
```

This refresh token should be valid for 90 days.

### Available resources

Available resrouces accessed from `https://api.atlassian.com/oauth/token/accessible-resources` is always empty even when the api are correctly exposed and access is granted.

const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

async function refreshToken() {
  try {
    // Read credentials
    const credContent = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(credContent);

    // Read current token
    const tokenContent = await fs.readFile(TOKEN_PATH);
    const token = JSON.parse(tokenContent);

    // Setup OAuth2 client
    const clientConfig = credentials.installed || credentials.web;
    const { client_secret, client_id } = clientConfig;
    const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

    // Set current credentials
    oAuth2Client.setCredentials(token);

    // Refresh the token
    console.log('Refreshing access token...');
    const { credentials: newCredentials } = await oAuth2Client.refreshAccessToken();

    // Save new token
    await fs.writeFile(TOKEN_PATH, JSON.stringify(newCredentials, null, 2));
    console.log('✓ Token successfully refreshed and saved to token.json');
    console.log('New expiry date:', new Date(newCredentials.expiry_date));

    // Update base64 version if it exists
    try {
      const base64Token = Buffer.from(JSON.stringify(newCredentials)).toString('base64');
      await fs.writeFile(path.join(process.cwd(), 'token_base64_new.txt'), base64Token);
      console.log('✓ Base64 token also updated in token_base64_new.txt');
    } catch (e) {
      // Ignore if base64 file doesn't exist
    }

  } catch (error) {
    console.error('Error refreshing token:', error.message);
    if (error.message.includes('invalid_grant')) {
      console.error('\n❌ The refresh token is invalid or expired.');
      console.error('You need to re-authenticate. Please run: node authenticate.js');
    }
    process.exit(1);
  }
}

refreshToken();

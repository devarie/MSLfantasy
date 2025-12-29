const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const readline = require('readline');

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function authenticate() {
  try {
    // Read credentials
    const credContent = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(credContent);

    const clientConfig = credentials.installed || credentials.web;
    const { client_secret, client_id } = clientConfig;
    const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

    // Generate auth URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent', // Force to get refresh token
    });

    console.log('\n📋 Google Sheets Authentication');
    console.log('================================\n');
    console.log('1. Open this URL in your browser:\n');
    console.log(authUrl);
    console.log('\n2. Authorize the application');
    console.log('3. Copy the code from the URL (after "code=")\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the authorization code: ', async (code) => {
      rl.close();

      try {
        // Exchange code for tokens
        const { tokens } = await oAuth2Client.getToken(code);

        // Save token
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        console.log('\n✓ Authentication successful!');
        console.log('✓ Token saved to token.json');

        // Also save base64 version for deployment
        const base64Token = Buffer.from(JSON.stringify(tokens)).toString('base64');
        await fs.writeFile(path.join(process.cwd(), 'token_base64_new.txt'), base64Token);
        console.log('✓ Base64 token saved to token_base64_new.txt');

        const base64Creds = Buffer.from(JSON.stringify(credentials)).toString('base64');
        await fs.writeFile(path.join(process.cwd(), 'credentials_base64.txt'), base64Creds);
        console.log('✓ Base64 credentials saved to credentials_base64.txt');

        console.log('\n✅ You can now use the application!');
        console.log('\nFor deployment, use these environment variables:');
        console.log('GOOGLE_CREDENTIALS=<content of credentials_base64.txt>');
        console.log('GOOGLE_TOKEN=<content of token_base64_new.txt>');

      } catch (error) {
        console.error('\n❌ Error getting tokens:', error.message);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Error during authentication:', error.message);
    process.exit(1);
  }
}

authenticate();

const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), 'service-account.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';
const RANGE = "'Deelnemers'!A1:J14";
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function authorize() {
  // Try Service Account first (recommended method)
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    try {
      let serviceAccount;
      // Try Base64 decoding first (recommended for Railway/Vercel)
      if (process.env.GOOGLE_SERVICE_ACCOUNT.length > 200 && !process.env.GOOGLE_SERVICE_ACCOUNT.startsWith('{')) {
        serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf-8'));
      } else {
        // Fall back to direct JSON parsing
        serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
      }

      const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: SCOPES,
      });

      return auth.getClient();
    } catch (err) {
      console.error('Error parsing service account from environment:', err.message);
      throw new Error('Unable to parse service account from environment variables: ' + err.message);
    }
  }

  // Try Service Account file (for local development)
  try {
    const serviceAccountContent = await fs.readFile(SERVICE_ACCOUNT_PATH);
    const serviceAccount = JSON.parse(serviceAccountContent);

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: SCOPES,
    });

    return auth.getClient();
  } catch (err) {
    // Service account not found, try OAuth method (legacy)
    console.log('Service account not found, falling back to OAuth...');
  }

  // Fallback to OAuth method (legacy - for backwards compatibility)
  let credentials;
  let token;

  if (process.env.GOOGLE_CREDENTIALS && process.env.GOOGLE_TOKEN) {
    try {
      // Try Base64 decoding first (recommended for Railway/Vercel)
      if (process.env.GOOGLE_CREDENTIALS.length > 200 && !process.env.GOOGLE_CREDENTIALS.startsWith('{')) {
        credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString('utf-8'));
        token = JSON.parse(Buffer.from(process.env.GOOGLE_TOKEN, 'base64').toString('utf-8'));
      } else {
        // Fall back to direct JSON parsing
        credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        token = JSON.parse(process.env.GOOGLE_TOKEN);
      }
    } catch (err) {
      throw new Error('Unable to parse credentials from environment variables: ' + err.message);
    }
  } else {
    // Fall back to files (for local development)
    try {
      const credContent = await fs.readFile(CREDENTIALS_PATH);
      credentials = JSON.parse(credContent);
      const tokenContent = await fs.readFile(TOKEN_PATH);
      token = JSON.parse(tokenContent);
    } catch (err) {
      throw new Error('Unable to load credentials. Set GOOGLE_SERVICE_ACCOUNT environment variable or provide service-account.json file.');
    }
  }

  const clientConfig = credentials.installed || credentials.web;
  const { client_secret, client_id } = clientConfig;
  const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function getSheetData() {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { success: false, data: [], message: 'No data found' };
    }

    return {
      success: true,
      data: rows,
      lastUpdated: new Date().toISOString(),
      range: RANGE,
    };
  } catch (err) {
    console.error('Error fetching spreadsheet data:', err.message);
    return {
      success: false,
      data: [],
      error: err.message,
    };
  }
}

module.exports = { getSheetData };

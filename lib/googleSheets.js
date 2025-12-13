const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';
const RANGE = "'Deelnemers'!A1:J14";
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function authorize() {
  let credentials;
  let token;

  // Try environment variables first (for Vercel deployment)
  if (process.env.GOOGLE_CREDENTIALS && process.env.GOOGLE_TOKEN) {
    credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    token = JSON.parse(process.env.GOOGLE_TOKEN);
  } else {
    // Fall back to files (for local development)
    try {
      const credContent = await fs.readFile(CREDENTIALS_PATH);
      credentials = JSON.parse(credContent);
      const tokenContent = await fs.readFile(TOKEN_PATH);
      token = JSON.parse(tokenContent);
    } catch (err) {
      throw new Error('Unable to load credentials. Set GOOGLE_CREDENTIALS and GOOGLE_TOKEN environment variables or provide credentials.json and token.json files.');
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

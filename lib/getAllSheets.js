const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function authorize() {
  let credentials;
  let token;

  // Try environment variables first (for deployment)
  if (process.env.GOOGLE_CREDENTIALS && process.env.GOOGLE_TOKEN) {
    try {
      // Try Base64 decoding first (recommended for Railway/Vercel)
      if (process.env.GOOGLE_CREDENTIALS.length > 200 && !process.env.GOOGLE_CREDENTIALS.startsWith('{')) {
        credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString('utf-8'));
        token = JSON.parse(Buffer.from(process.env.GOOGLE_TOKEN, 'base64').toString('utf-8'));
      } else {
        credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        token = JSON.parse(process.env.GOOGLE_TOKEN);
      }
    } catch (err) {
      throw new Error('Unable to parse credentials from environment variables: ' + err.message);
    }
  } else {
    try {
      const credContent = await fs.readFile(CREDENTIALS_PATH);
      credentials = JSON.parse(credContent);
      const tokenContent = await fs.readFile(TOKEN_PATH);
      token = JSON.parse(tokenContent);
    } catch (err) {
      throw new Error('Unable to load credentials.');
    }
  }

  const clientConfig = credentials.installed || credentials.web;
  const { client_secret, client_id } = clientConfig;
  const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function getAllCompetitionSheets() {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    // First, get all sheet names
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const allSheets = spreadsheet.data.sheets.map(sheet => sheet.properties.title);

    // Fetch data from all sheets (except 'Deelnemers' which is the overview)
    const competitionSheets = allSheets.filter(name => name !== 'Deelnemers' && name !== 'Sheet1');

    const results = await Promise.all(
      competitionSheets.map(async (sheetName) => {
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `'${sheetName}'!A1:Z100`, // Get first 100 rows
          });

          return {
            name: sheetName,
            data: response.data.values || [],
          };
        } catch (err) {
          console.error(`Error fetching ${sheetName}:`, err.message);
          return {
            name: sheetName,
            data: [],
            error: err.message,
          };
        }
      })
    );

    return {
      success: true,
      sheets: results,
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Error fetching competition sheets:', err.message);
    return {
      success: false,
      sheets: [],
      error: err.message,
    };
  }
}

module.exports = { getAllCompetitionSheets };

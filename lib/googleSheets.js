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
  try {
    const content = await fs.readFile(CREDENTIALS_PATH);
    credentials = JSON.parse(content);
  } catch (err) {
    throw new Error('Unable to load credentials file');
  }

  const clientConfig = credentials.installed || credentials.web;
  const { client_secret, client_id } = clientConfig;
  const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  try {
    const token = await fs.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    throw new Error('No valid token found. Please run authentication first.');
  }
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

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';

async function authorize() {
  const credContent = await fs.readFile(CREDENTIALS_PATH);
  const credentials = JSON.parse(credContent);
  const tokenContent = await fs.readFile(TOKEN_PATH);
  const token = JSON.parse(tokenContent);

  const clientConfig = credentials.installed || credentials.web;
  const { client_secret, client_id } = clientConfig;
  const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

async function listSheets() {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    console.log('\n==============================================');
    console.log('Sheets in je Google Spreadsheet:');
    console.log('==============================================\n');

    response.data.sheets.forEach((sheet, index) => {
      const sheetInfo = sheet.properties;
      console.log(`${index + 1}. "${sheetInfo.title}"`);
      console.log(`   - Sheet ID: ${sheetInfo.sheetId}`);
      console.log(`   - Index: ${sheetInfo.index}`);
      console.log(`   - Rijen: ${sheetInfo.gridProperties.rowCount}`);
      console.log(`   - Kolommen: ${sheetInfo.gridProperties.columnCount}`);
      console.log('');
    });

    console.log('==============================================\n');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

listSheets();

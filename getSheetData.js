const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

// Path to your credentials file
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// The ID of your spreadsheet
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';
const RANGE = "'Deelnemers'!A1:J14";

// Scopes for Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * Load or request authorization to call APIs.
 */
async function authorize() {
  let credentials;
  try {
    const content = await fs.readFile(CREDENTIALS_PATH);
    credentials = JSON.parse(content);
  } catch (err) {
    console.error('Error loading credentials file:', err);
    console.log('\nPlease copy your credentials file to:', CREDENTIALS_PATH);
    process.exit(1);
  }

  const clientConfig = credentials.installed || credentials.web;
  const { client_secret, client_id } = clientConfig;
  const redirect_uri = clientConfig.redirect_uris?.[0] || 'http://localhost:3000/oauth2callback';
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  // Check if we have previously stored a token
  try {
    const token = await fs.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    return getNewToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization
 */
async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('\n==============================================');
  console.log('Authorize this app by visiting this url:');
  console.log(authUrl);
  console.log('==============================================\n');
  console.log('After authorization, you will be redirected to a URL.');
  console.log('Copy the CODE from that URL and run:');
  console.log('node getSheetData.js YOUR_CODE_HERE\n');

  const code = process.argv[2];
  if (!code) {
    process.exit(0);
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
    console.log('Token stored successfully!\n');
    return oAuth2Client;
  } catch (err) {
    console.error('Error retrieving access token:', err);
    process.exit(1);
  }
}

/**
 * Fetch data from Google Sheets
 */
async function getSheetData(auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }

    console.log('\n==============================================');
    console.log('Data from', RANGE);
    console.log('==============================================\n');

    // Display as a table
    rows.forEach((row, index) => {
      const rowNumber = 1 + index;
      console.log(`Row ${rowNumber}:`, row.join(' | '));
    });

    console.log('\n==============================================');
    console.log('Raw data (JSON):');
    console.log('==============================================');
    console.log(JSON.stringify(rows, null, 2));

  } catch (err) {
    console.error('Error fetching spreadsheet data:', err.message);
  }
}

// Main execution
authorize()
  .then(getSheetData)
  .catch(console.error);

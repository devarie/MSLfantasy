const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

// Path to service account file
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');

// The ID of your spreadsheet
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';
const RANGE = process.argv[2] || "'Deelnemers'!A1:J14";

// Scopes for Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * Load service account and authorize
 */
async function authorize() {
  try {
    const serviceAccountContent = await fs.readFile(SERVICE_ACCOUNT_PATH);
    const serviceAccount = JSON.parse(serviceAccountContent);

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: SCOPES,
    });

    return auth.getClient();
  } catch (err) {
    console.error('Error loading service account:', err.message);
    console.log('\nPlease ensure service-account.json exists at:', SERVICE_ACCOUNT_PATH);
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

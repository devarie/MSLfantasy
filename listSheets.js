const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');
const SPREADSHEET_ID = '1Gt-mQjRwPQerXUddEJjqHgq9sw4SflEkmoiXYeAjJLg';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function authorize() {
  const serviceAccountContent = await fs.readFile(SERVICE_ACCOUNT_PATH);
  const serviceAccount = JSON.parse(serviceAccountContent);

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: SCOPES,
  });

  return auth.getClient();
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

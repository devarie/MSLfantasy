const { getSheetData } = require('./lib/googleSheets');
const fs = require('fs').promises;
const path = require('path');

const DATA_CACHE_PATH = path.join(__dirname, 'data', 'sheets-cache.json');
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

async function updateData() {
  try {
    console.log(`[${new Date().toLocaleString()}] Fetching data from Google Sheets...`);

    const result = await getSheetData();

    if (result.success) {
      await fs.mkdir(path.dirname(DATA_CACHE_PATH), { recursive: true });
      await fs.writeFile(DATA_CACHE_PATH, JSON.stringify(result, null, 2));

      console.log(`[${new Date().toLocaleString()}] ✓ Data updated successfully`);
      console.log(`  - Rows fetched: ${result.data.length}`);
      console.log(`  - Last updated: ${result.lastUpdated}`);
    } else {
      console.error(`[${new Date().toLocaleString()}] ✗ Failed to fetch data:`, result.error);
    }
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] ✗ Error:`, error.message);
  }
}

async function startAutoUpdate() {
  console.log('==============================================');
  console.log('Google Sheets Auto-Update Service');
  console.log('==============================================');
  console.log(`Update interval: ${UPDATE_INTERVAL / 1000 / 60} minutes`);
  console.log(`Data will be saved to: ${DATA_CACHE_PATH}`);
  console.log('==============================================\n');

  await updateData();

  setInterval(updateData, UPDATE_INTERVAL);

  console.log(`\nService is running. Press Ctrl+C to stop.\n`);
}

startAutoUpdate();

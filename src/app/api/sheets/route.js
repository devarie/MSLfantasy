import { NextResponse } from 'next/server';
import { getSheetData } from '../../../../lib/googleSheets';
import fs from 'fs/promises';
import path from 'path';

const DATA_CACHE_PATH = path.join(process.cwd(), 'data', 'sheets-cache.json');

export async function GET() {
  try {
    const result = await getSheetData();

    if (result.success) {
      await fs.mkdir(path.dirname(DATA_CACHE_PATH), { recursive: true });
      await fs.writeFile(DATA_CACHE_PATH, JSON.stringify(result, null, 2));
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

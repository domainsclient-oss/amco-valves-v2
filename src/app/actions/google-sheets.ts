'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface SheetRow {
  "Full Name": string;
  "Email Address": string;
  "Phone Number": string;
  "Your Message": string;
}

/**
 * Server action to append a row to the specified Google Sheet.
 * Handles private key newline formatting required for Vercel/Cloud environments.
 */
export async function appendToLeadsSheet(data: SheetRow) {
  try {
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    // Vercel often escapes newlines in env vars. This regex ensures they are interpreted correctly as real newlines.
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Leads';

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('GOOGLE SHEETS: Missing environment variables.');
      throw new Error('Server configuration error. Please check environment variables.');
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByTitle[tabName];
    if (!sheet) {
      const availableTabs = doc.sheetsByIndex.map(s => s.title).join(', ');
      throw new Error(`Tab "${tabName}" not found. Available tabs are: ${availableTabs}`);
    }

    // Row 1 of your sheet MUST have these exact headers: Full Name | Email Address | Phone Number | Your Message
    await sheet.addRow({
      "Full Name": data["Full Name"],
      "Email Address": data["Email Address"],
      "Phone Number": data["Phone Number"],
      "Your Message": data["Your Message"]
    });

    return { success: true };
  } catch (error: any) {
    // Log complete error for server-side debugging (visible in Vercel logs)
    console.error('GOOGLE SHEETS API ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

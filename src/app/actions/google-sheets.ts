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
    // Vercel and other cloud providers often escape newlines. This regex ensures they are interpreted correctly.
    const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const privateKey = rawPrivateKey ? rawPrivateKey.replace(/\\n/g, '\n') : undefined;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Leads';

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('GOOGLE SHEETS: Missing environment variables.');
      throw new Error('Server configuration error. Please ensure all GOOGLE_SHEETS environment variables are set in Vercel.');
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
      throw new Error(`Tab "${tabName}" not found in spreadsheet. Available tabs: ${availableTabs}`);
    }

    /**
     * SANITIZATION LOGIC:
     * Google Sheets treats strings starting with '+' or '=' as formulas.
     * To store phone numbers correctly, we prefix them with a single quote (').
     * This quote is invisible in the sheet but forces the cell to stay as text.
     */
    const sanitizeForSheet = (val: string) => {
      const stringVal = String(val || '').trim();
      if (stringVal.startsWith('+') || stringVal.startsWith('=')) {
        return `'${stringVal}`;
      }
      return stringVal;
    };

    // Row 1 of your sheet MUST have these exact headers: Full Name | Email Address | Phone Number | Your Message
    await sheet.addRow({
      "Full Name": data["Full Name"],
      "Email Address": data["Email Address"],
      "Phone Number": sanitizeForSheet(data["Phone Number"]),
      "Your Message": data["Your Message"]
    });

    return { success: true };
  } catch (error: any) {
    console.error('GOOGLE SHEETS API ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

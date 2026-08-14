'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface SheetRow {
  "Full Name": string;
  "Email Address": string;
  "Phone Number": string;
  "Your Message": string;
  "Product Name"?: string;
}

/**
 * Server action to append a row to a specified Google Sheet tab.
 * tabName defaults to 'Leads' if not provided.
 */
export async function appendToGoogleSheet(data: SheetRow, targetTab?: string) {
  try {
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const privateKey = rawPrivateKey ? rawPrivateKey.replace(/\\n/g, '\n') : undefined;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    // Target tab: custom name (like 'Request_quote') or fallbacks
    const tabName = targetTab || process.env.GOOGLE_SHEET_TAB_NAME || 'Leads';

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('GOOGLE SHEETS: Missing environment variables.');
      throw new Error('Server configuration error. Please ensure environment variables are set.');
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
      throw new Error(`Tab "${tabName}" not found in spreadsheet.`);
    }

    const sanitizeForSheet = (val: string) => {
      const stringVal = String(val || '').trim();
      if (stringVal.startsWith('+') || stringVal.startsWith('=')) {
        return `'${stringVal}`;
      }
      return stringVal;
    };

    // Note: Tab headers should match: Full Name | Email Address | Phone Number | Your Message | Product Name
    await sheet.addRow({
      "Full Name": data["Full Name"],
      "Email Address": data["Email Address"],
      "Phone Number": sanitizeForSheet(data["Phone Number"]),
      "Your Message": data["Your Message"],
      "Product Name": data["Product Name"] || "General Inquiry"
    });

    return { success: true };
  } catch (error: any) {
    console.error('GOOGLE SHEETS API ERROR:', error.message);
    return { success: false, error: error.message };
  }
}

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
 */
export async function appendToGoogleSheet(data: SheetRow, targetTab?: string) {
  try {
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const privateKey = rawPrivateKey ? rawPrivateKey.replace(/\\n/g, '\n') : undefined;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    // Determine the target tab
    let tabName = targetTab || (data["Product Name"] && data["Product Name"] !== "Contact Form" 
      ? (process.env.GOOGLE_SHEET_TAB_NAME2 || "Request_quote")
      : (process.env.GOOGLE_SHEET_TAB_NAME || 'Leads'));

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('GOOGLE SHEETS CONFIG ERROR: Missing environment variables.');
      throw new Error('Server configuration error. Environment variables are not set.');
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    let sheet = doc.sheetsByTitle[tabName];
    
    // If tab doesn't exist, try to find the first one or error
    if (!sheet) {
      console.warn(`Tab "${tabName}" not found. Falling back to default tab.`);
      sheet = doc.sheetsByIndex[0];
    }

    const sanitizeForSheet = (val: string) => {
      const stringVal = String(val || '').trim();
      if (stringVal.startsWith('+') || stringVal.startsWith('=')) {
        return `'${stringVal}`;
      }
      return stringVal;
    };

    // Ensure headers exist if sheet is empty
    if (sheet.rowCount <= 1) {
      await sheet.setHeaderRow(["Full Name", "Email Address", "Phone Number", "Your Message", "Product Name"]);
    }

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

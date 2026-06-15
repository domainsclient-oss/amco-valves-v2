
'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface SheetRow {
  "Full Name": string;
  "Email Address": string;
  "Phone Number": string;
  "Message": string;
}

export async function appendToLeadsSheet(data: SheetRow) {
  try {
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Leads';

    if (!clientEmail || !privateKey || !spreadsheetId) {
      throw new Error('Google Sheets credentials are not properly configured in environment variables.');
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

    // Append the row. The keys in the data object must match the column headers in row 1 of the sheet.
    await sheet.addRow({
      "Full Name": data["Full Name"],
      "Email Address": data["Email Address"],
      "Phone Number": data["Phone Number"],
      "Message": data["Message"]
    });

    return { success: true };
  } catch (error: any) {
    console.error('Google Sheets Submission Error:', error);
    return { success: false, error: error.message };
  }
}

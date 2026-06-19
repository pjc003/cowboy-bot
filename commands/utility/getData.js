const express = require("express");
const { google } = require("googleapis");
const credentials = "./commands/utility/credentials.json";
const { spreadsheetId } = require("../../config.json");

//copilot function, finds next question to send
async function findLastWithNextEmpty(spreadsheetId) {
    const auth = new google.auth.GoogleAuth({
        keyFile: credentials,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    spreadsheetId;
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client })
// fetch both columns A and B from row 2 downwards
  const res = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A2:B",
    majorDimension: "ROWS",
    valueRenderOption: "FORMATTED_VALUE",
  });

  const rows = res.data.values || [];

  // scan from top to bottom to find the last row where A has a value and B is empty
  for (let i = 0; i < rows.length; i++) {

    const a = (rows[i][0] ?? "").toString().trim();
    const b = (rows[i][1] ?? "").toString().trim();
    if (a !== "" && b == "") {
      const rowNumber = i + 2; // because we started at A2
	value = a;
	await markSent();
      return value;
      };
    };

  // nothing found
  return { value: "", row: null, range: null };
};

//mark that message as sent
async function markSent(){
  spreadsheetId;

  const auth = new google.auth.GoogleAuth({
    keyFile: credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  // Read column B starting at row 2
  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "B2:B",
    majorDimension: "COLUMNS",
    valueRenderOption: "FORMATTED_VALUE",
  });

  const colB = (getRes.data.values && getRes.data.values[0]) || [];

  // Find first empty cell in the fetched range
  let rowNumber = null;
  for (let i = 0; i < colB.length; i++) {
    const cell = (colB[i] ?? "").toString().trim();
    if (cell === "") {
      rowNumber = i + 2; // offset because range starts at row 2
      break;
    };
  };

  // If no empty cell found in fetched range, next empty is the row after the last fetched value
  if (rowNumber === null) {
    rowNumber = colB.length + 2;
  };

  const range = `B${rowNumber}`;

  // Update that cell to "posted"
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values: [["posted"]],
    },
  });

  return range; // e.g. "B5"
};


async function getMessageCell(){
	spreadsheetId;
	const message = await findLastWithNextEmpty(spreadsheetId);
	return message;
};

module.exports = { getMessageCell };

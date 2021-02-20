/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const fakeData = require("./testData.json");

const { journalEntries, users } = fakeData;
const data = JSON.stringify({ journalEntries, users });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});

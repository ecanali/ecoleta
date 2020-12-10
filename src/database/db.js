// imports sqlite3 dependency
const sqlite3 = require("sqlite3").verbose()

// creates object that will make operations in database
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
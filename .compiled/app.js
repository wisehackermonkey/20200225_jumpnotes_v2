"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _lowdb = require("lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = require("lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//settings
//https://github.com/typicode/lowdb
//jumpnotes try number 2 
//a notetaking app using a web page as the gui, and a nodejs backend 
//by wisehackermonkey oran c
//20200225
//x web page with text box
//  api endpoint
//  save to json function
// dockerize
//  host
// x finish form setup [https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms]
// - button save


// x setup
// x  api endpoint for form
// x  webpage static routing
// x webpage form
// x  databse save notes from form
//----feature creap
// x view saved notes
// x webpage css flex box for notes
// - edit page
// - edit text on clicked
// - add favicon 
// - dockerize

//fix  editNote(text)to work with note id number
var PORT = 3000;

//used for striping sanitizing user input

var EMPTY_DB_SCHEMA = { notes: [] };
var DATABASE_PATH = './db/db.json';

//library setup
var adapter = new _FileSync2.default(DATABASE_PATH);
var app = (0, _express2.default)();
var db = (0, _lowdb2.default)(adapter);

// library setup oneliners
//static host main page
app.use(_express2.default.static("web"));
app.use(_express2.default.urlencoded());

//save the notes to the database
app.post("/v1/note-save/", [
//user input checks
//-----------
(0, _expressValidator.check)("note_text").isString().isLength({ min: 1 }).trim().escape()
//-----------
], function (req, res) {

    var note_text = req.body.note_text;

    SaveNoteDatabase(note_text);

    var result_message = "Note has been saved to database:" + JSON.stringify(req.body);

    console.log(req.url);
    console.log("Saved note: " + note_text);
    console.log(result_message);
    res.send(result_message);
});

app.get("/v1/load-notes/", function (req, res) {

    var load_db_json = db.get("notes").value();

    if (load_db_json) {
        console.log(load_db_json.reduce(function (accumulator, current) {
            return accumulator + ("\n " + current.time + ": " + current.text);
        }));
    } else {
        console.log("database is empty");
    }
    res.send(JSON.stringify(load_db_json));
});

console.log("Jumpnotes server v2: Starting...");

SetupDatabase(EMPTY_DB_SCHEMA);

app.listen(PORT, function () {
    console.log("Running..");
    console.log("jumpnotes is running on http://localhost:" + PORT);
});

//database functionality
function SetupDatabase(schema) {
    db.defaults(schema).write();
}

function SaveNoteDatabase(note_text_) {
    //save note to json database
    db.get("notes").push({ text: note_text_, time: Date.now() }).write();
}
//# sourceMappingURL=app.js.map
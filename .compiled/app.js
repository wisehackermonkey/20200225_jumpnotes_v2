"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _lowdb = require("lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = require("lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//settings
var PORT = 3000; //https://github.com/typicode/lowdb
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
//x  api endpoint for form
//x  webpage static routing
//x webpage form
//  databse save notes from form
//  ----feature creap
// view saved notes
// webpage css flex box for notes
// edit on notes when clicked

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

app.post("/v1/note-save/", function (req, res) {
    console.log(req.url);

    var note_text = req.body.notefields;
    console.log(note_text);
    // SaveNoteDatabase()
    var result_message = "Note has been saved to database:" + JSON.stringify(req.body);
    console.log(result_message);
    res.send(result_message);
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

function SaveNoteDatabase(note_text) {
    //save note to json database
    db.get("notes").push({ text: note_text, time: Date.now() }).write();
}
//# sourceMappingURL=app.js.map
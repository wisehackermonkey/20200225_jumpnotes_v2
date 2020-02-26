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
import express from "express"
import low from "lowdb" //https://github.com/typicode/lowdb
import FileSync from "lowdb/adapters/FileSync"




//settings
const PORT = 3000
const EMPTY_DB_SCHEMA = {notes:[]}
const DATABASE_PATH = './db/db.json'

//library setup
const adapter = new FileSync(DATABASE_PATH)
const app = express()
const db = low(adapter)

// library setup oneliners
//static host main page
app.use(express.static("web"))
app.use(express.urlencoded())






app.post("/v1/note-save/", (req,res)=>{
    console.log(req.url)

    let note_text = req.body.notefields
    console.log(note_text)
    // SaveNoteDatabase()
    let result_message = "Note has been saved to database:" +JSON.stringify(req.body)
    console.log(result_message)
    res.send(result_message);
})



console.log("Jumpnotes server v2: Starting...")

SetupDatabase(EMPTY_DB_SCHEMA)


app.listen(PORT,()=>{
    console.log("Running..")
    console.log(`jumpnotes is running on http://localhost:${PORT}`)
})


//database functionality
function SetupDatabase(schema){
    db.defaults(schema).write()
}

function SaveNoteDatabase(note_text){
     //save note to json database
     db.get("notes")
     .push( { text: note_text, time: Date.now()})
     .write()
}
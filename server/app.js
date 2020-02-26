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





//save the notes to the database
app.post("/v1/note-save/", (req,res)=>{

    let note_text = req.body.note_text
    
    SaveNoteDatabase(note_text)
    
    let result_message = "Note has been saved to database:" +JSON.stringify(req.body)

    console.log(req.url)
    console.log(`Saved note: ${note_text}`)
    console.log(result_message)
    res.send(result_message);
})


app.get("/v1/load-notes/",(req,res)=>{
    
    let load_db_json = db.get("notes").value()
   
    if(load_db_json){
        console.log(load_db_json.reduce((accumulator,current)=> accumulator + `\n ${current.time}: ${current.text}` ))
    }else{
        console.log("database is empty")
    }
    res.send(JSON.stringify(load_db_json))
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

function SaveNoteDatabase(note_text_){
     //save note to json database
     db.get("notes")
     .push( { text: note_text_, time: Date.now()})
     .write()
}
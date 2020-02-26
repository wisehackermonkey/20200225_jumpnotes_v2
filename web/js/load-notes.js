const settings = {
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
  }
}

const NOTE_TEXT_CSS_ID = "note-text"
const NOTES_CONTAINER_CSS_ID = "notes-container"

async function load_notes(){
    const notes_server_response = await fetch("/v1/load-notes/",settings)
    const notes_json = await notes_server_response.json()
    console.log(notes_json)

    //assign onscreen notes the value stored on the servers db
    displayNotes(notes_json)
}
//todo 
// function editNote(text){
//     let noteElement = document.getElementById(NOTE_TEXT_CSS_ID)
//     noteElement.innerText = text
// }
function addNote(text,note_id){
    let noteContainer = document.getElementById(NOTES_CONTAINER_CSS_ID)
    const note_template_html = `<div id="note-${note_id}" class="note-styling">
    <p id="note-text">${text}</p>
</div>
<br>`
  noteContainer.innerHTML += note_template_html
}

//show notes by iterating over each note within notes_array
//and appending a html template to "<div id="notes-container">" within index.html
function displayNotes(notes_array){
    notes_array.map((note_text,note_id)=>{
        addNote(note_text.text,note_id)
    })

}
// https://www.w3schools.com/howto/howto_js_snackbar.asp
function savePopup(){
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(()=>{ 
        location.reload() 
        x.className = x.className.replace("show", "")
        
    }, 3000)
}

load_notes()


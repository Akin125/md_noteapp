import React from "react"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import "../css/App.css"



export default function App() {
  //for setting a new note and also calling back the localstorage as initial state
  const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || [] //passed a function to initialize the lazy state
      //data
  )

  //for keeping track of the id
  const [currentNoteId, setCurrentNoteId] = React.useState(
      (notes[0] && notes[0].id) || ""
  )

  //for the name customization
  const [myName, setName] = React.useState(() => (
      {
          name: ""
      }
  ))

    //to handle the change
    function handleChange(event){
       const {name,value} = event.target;
       setName(prevState => ({
                ...prevState,
               [name] : value
       }))
    }

  //useEffect used to synchronize the notes with the local browser storage
  React.useEffect(
      function (){
        return(
            //creating a form of localstorage for the app on the browser
            localStorage.setItem("notes", JSON.stringify(notes))
            //clean up function
        )
      },
      [notes] // will run the function if anything in notes arr changes
  )

  function createNewNote() {
    const newNote = {
      id: nanoid(), // this will generate a random id
      body: "# Type your markdown note's title here"
    }
    // this is setting
    setNotes(prevNotes => [newNote, ...prevNotes])
    // this is taking the randomly generated  id from newNote and setting it to the currentNoteId So it can be reused

    setCurrentNoteId(newNote.id)
    //console.log(newNote.id)
    //console.log(notes)
    //console.log(newNote)
    //console.log(currentNoteId)

  }

  function updateNote(text) {
    setNotes(
        oldNotes =>{
          const myArr = [];
          for(let i = 0; i < oldNotes.length; i++){
          const oldNote = oldNotes[i];
          if(oldNote.id === currentNoteId){
              myArr.unshift({...oldNote, body: text})
          }else{
              myArr.push(oldNote)
          }
          }
          return myArr
        }
    )
  }

    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //   return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote
    // }))


  function findCurrentNote() {

    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
    //console.log(notes.id)
  }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }


  return (
      <main>
        {
          notes.length > 0
              ?
              <Split
                  sizes={[30, 70]}
                  direction="horizontal"
                  className="split"
              >
                <Sidebar
                    setName={myName}
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId &&
                    notes.length > 0 &&
                    <Editor
                        currentNote={findCurrentNote()}
                        updateNote={updateNote}
                    />
                }
              </Split>
              :
              <div className="no-notes">
                <h1>You have no notes</h1>
                  <label>

                      <input
                          placeholder={"Username"}
                          type={"text"}
                          name={"name"}
                          value={myName.name}
                          onChange={handleChange}
                      />
                  </label>
                <button
                    className="first-note"
                    onClick={createNewNote}
                >
                  Create one now
                </button>


              </div>

        }
      </main>
  )
}

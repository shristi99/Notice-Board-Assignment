import './App.css';
import BulletinBoard from './BulletinBoard';
import { useState } from 'react';


function App() {
  const [notes, setNotes] = useState([]);
  function addNote() {

    const initialX=window.innerWidth/2;
    const initialY=window.innerHeight/2;

    setNotes((prevNotes) =>[
        ...prevNotes,
        {
            id: Date.now(),
            positionX:initialX,
            positionY:initialY,
        },

    ])
}

function removeNote(noteId) {
    setNotes(notes.filter((item) => item.id !== noteId))
}

  return (
    <div>
      <button className='sticky-btn' onClick={addNote}>+</button>
     {notes.map((item) => (
      <BulletinBoard
      onRemove={() => removeNote(item.id)}
      />
      ))}
      {/* <BulletinBoard/> */}
    </div>
  )
}

export default App;

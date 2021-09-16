import React, { useEffect, useState } from 'react';
import TextEditor from './TextEditor';
import NoteTile from './NoteTile';
import { styled, Box, Button } from '@material-ui/core';

const NoteWrapper = styled(Box)({
  height: 300,
  overflow: 'auto',
  marginTop: 20,
});

function App(props) {
  const [notes, setNotes] = useState([]);
  const [editableNote, setEditableNote] = useState(undefined);

  return (
    <div>
      <TextEditor
        setNotes={setNotes}
        editableNote={editableNote}
        setEditableNote={setEditableNote}
      />
      <NoteWrapper className="scrollElement">
        {notes.map((n, i) => (
          <NoteTile
            key={i}
            note={n.note}
            createdAt={n.createdAt}
            index={i}
            setNotes={setNotes}
            editableNote={editableNote}
            setEditableNote={setEditableNote}
          />
        ))}
      </NoteWrapper>
    </div>
  );
}

export default App;

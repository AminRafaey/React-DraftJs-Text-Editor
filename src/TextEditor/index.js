import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { styled, Box, Button } from '@material-ui/core';
import DraftJsEditor from '../DraftJs';

const TextEditorWrapper = styled(Box)({
  marginTop: 50,
});

const ActionsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingInline: 25,
  marginInline: 10,
  background: '#F5F6F8',
  paddingBlock: 10,
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  borderBottom: '1px solid #E3E8EE',
  borderInline: '1px solid #E3E8EE',
});

const TextEditor = (props) => {
  const { setNotes, editableNote, setEditableNote } = props;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    editableNote
      ? setEditorState(editableNote.note)
      : setEditorState(EditorState.createEmpty());
  }, [editableNote]);

  const handleSave = () => {
    if (editableNote) {
      if (editorState.getCurrentContent().hasText()) {
        setNotes((prevState) =>
          prevState.map((p, i) =>
            i === editableNote.index ? { ...p, note: editorState } : p
          )
        );
        setEditableNote(undefined);
        setEditorState(EditorState.createEmpty());
      } else {
        setNotes((prevState) =>
          prevState.filter((p, i) => i !== editableNote.index)
        );
        setEditableNote(undefined);
        setEditorState(EditorState.createEmpty());
      }
    } else {
      if (editorState.getCurrentContent().hasText()) {
        setNotes((prevState) => [
          ...prevState,
          { note: editorState, createdAt: new Date() },
        ]);
        setEditorState(EditorState.createEmpty());
      }
    }
  };
  return (
    <TextEditorWrapper>
      <DraftJsEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ActionsWrapper>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {editableNote ? 'Update' : 'Save'}
        </Button>
      </ActionsWrapper>
    </TextEditorWrapper>
  );
};
export default TextEditor;

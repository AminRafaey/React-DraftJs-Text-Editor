import React, { useEffect, useState } from "react";
import { convertToHTML } from "draft-convert";
import { styled, Box, Typography, CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import EDOptions from "./EDOptions";

const NoteTileWrapper = styled(Box)({
  marginBlock: 25,
  marginInline: 10,
  border: "1px solid #E3E8EE",
  borderRadius: 5
});

const ContentTyp = styled(Typography)({
  padding: "20px 0px 5px 20px",
  wordBreak: "break-all"
});

const DateTyp = styled(Typography)({
  fontSize: 12,
  color: "#9e9e9e",
  paddingLeft: 20,
  paddingBottom: 20
});

function NoteTile(props) {
  const {
    note,
    createdAt,
    index,
    setNotes,
    editableNote,
    setEditableNote
  } = props;

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const html = convertToHTML({
      styleToHTML: (style) => {},
      blockToHTML: (block) => {
        if (block.type === "center") {
          return <p style={{ display: "flex", justifyContent: "center" }} />;
        } else if (block.type === "left") {
          return (
            <p style={{ display: "flex", justifyContent: "flex-start" }} />
          );
        } else if (block.type === "right") {
          return <p style={{ display: "flex", justifyContent: "flex-end" }} />;
        }
      }
    })(note.getCurrentContent());

    setConvertedContent(html);
  }, [note]);

  return (
    <NoteTileWrapper>
      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#F7FAFC",
          ...(editableNote &&
            JSON.stringify(editableNote.note) === JSON.stringify(note) && {
              border: "1px solid #1488FC"
            })
        }}
      >
        <Box width="100%">
          <ContentTyp
            dangerouslySetInnerHTML={{ __html: convertedContent }}
          ></ContentTyp>
          <DateTyp>{createdAt.toDateString()}</DateTyp>
        </Box>
        <EDOptions
          note={note}
          index={index}
          setNotes={setNotes}
          setEditableNote={setEditableNote}
        />
      </Paper>
    </NoteTileWrapper>
  );
}

export default NoteTile;

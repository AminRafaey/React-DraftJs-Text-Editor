import React, { useRef } from "react";
import Draft from "draft-js";
import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";
import { styled, Box } from "@material-ui/core";
import "./rich.css";

const EditorWrapper = styled(Box)({
  margin: "10px 10px 0px",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  border: "1px solid #ededed"
});

const ToolbarWrapper = styled(Box)({
  padding: 10,
  background: "#EDEDED"
});

const { Editor, RichUtils, getDefaultKeyBinding } = Draft;

export default function DraftJsEditor({ editorState, setEditorState }) {
  const editorRef = useRef(null);

  const focus = () => editorRef.current.focus();
  const onChange = (editorState) => setEditorState(editorState);

  const _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const _mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  function _toggleBlockType(blockType) {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  function _toggleInlineStyle(inlineStyle) {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  } else {
    className += " RichEditor-hidePlaceholder";
  }

  return (
    <EditorWrapper className="RichEditor-root">
      <ToolbarWrapper>
        <InlineStyleControls
          editorState={editorState}
          onToggle={_toggleInlineStyle}
        />

        <BlockStyleControls
          editorState={editorState}
          onToggle={_toggleBlockType}
        />
      </ToolbarWrapper>
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          handleKeyCommand={_handleKeyCommand}
          keyBindingFn={_mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Type to enter note..."
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </EditorWrapper>
  );
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "left":
      return "align-left";
    case "center":
      return "align-center";
    case "right":
      return "align-right";
    default:
      return null;
  }
}

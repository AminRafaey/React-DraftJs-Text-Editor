import React from "react";
import { BoldIcon, UnderlineIcon, ItalicIcon } from "../../resources";
import { styled, Box } from "@material-ui/core";
import StyleButton from "../StyleButton";

const InlineIconWrapper = styled(Box)({
  paddingInline: 20,
  borderLeft: "1px solid #ccc",
  borderRight: "1px solid #ccc",
  display: "inline-block"
});

const INLINE_STYLES = [
  { label: "bold", icon: <BoldIcon />, style: "BOLD" },
  { label: "italic", icon: <ItalicIcon />, style: "ITALIC" },
  { label: "underline", icon: <UnderlineIcon />, style: "UNDERLINE" }
];

export default function InlineStyleControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <InlineIconWrapper>
      {INLINE_STYLES.map((type, i) => (
        <StyleButton
          key={i}
          active={currentStyle.has(type.style)}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </InlineIconWrapper>
  );
}

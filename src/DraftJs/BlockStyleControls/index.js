import React from "react";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  OrderListIcon,
  UnorderListIcon,
  AlignRightIcon
} from "../../resources";
import { styled, Box } from "@material-ui/core";
import StyleButton from "../StyleButton";

const InlineIconWrapper = styled(Box)({
  paddingInline: 20,
  borderRight: "1px solid #ccc",
  display: "inline-block"
});

const BLOCK_TYPES = [
  { label: "align-left", icon: <AlignLeftIcon />, style: "left" },
  { label: "align-center", icon: <AlignCenterIcon />, style: "center" },
  { label: "align-right", icon: <AlignRightIcon />, style: "right" },
  {
    label: "ordered-list-item",
    icon: <OrderListIcon />,
    style: "ordered-list-item"
  },
  {
    label: "unordered-list-item",
    icon: <UnorderListIcon />,
    style: "unordered-list-item"
  }
];

export default function BlockStyleControls(props) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <React.Fragment>
      <InlineIconWrapper>
        {BLOCK_TYPES.slice(0, 3).map((type, i) => (
          <StyleButton
            key={i}
            icon={type.icon}
            onToggle={props.onToggle}
            label={type.label}
            style={type.style}
            active={type.style === blockType}
          />
        ))}
      </InlineIconWrapper>
      <InlineIconWrapper>
        {BLOCK_TYPES.slice(3, 5).map((type, i) => (
          <StyleButton
            key={i}
            icon={type.icon}
            onToggle={props.onToggle}
            label={type.label}
            style={type.style}
            active={type.style === blockType}
          />
        ))}
      </InlineIconWrapper>
    </React.Fragment>
  );
}

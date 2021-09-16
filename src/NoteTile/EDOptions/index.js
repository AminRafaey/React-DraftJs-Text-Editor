import React, { useState } from 'react';

import {
  FormControl,
  OutlinedInput,
  Popover,
  Button,
  Slider,
  styled,
  Box,
  Typography,
  withStyles,
  Grid,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MoreVertIcon from '@material-ui/icons/MoreVert';
const FieldAdjustmentWrapper = styled(Box)({});

const ContentWrapper = styled(Box)({
  width: 300,
});

const IconParentWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});

const IconWrapper = styled(Box)({
  paddingInline: 10,
  paddingTop: 10,
  paddingBottom: 5,
  cursor: 'pointer',
  borderRadius: '50%',
  '&:hover': {
    background: '#eeeeee',
  },
});

const StyledPopover = withStyles({
  paper: {
    overflow: 'unset',
    filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, .2))',
  },
})(Popover);

export default function EDOptions(props) {
  const { note, setNotes, index, setEditableNote } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleDelete = () => {
    setNotes((prevState) => prevState.filter((p, i) => i !== index));
    handleClose();
  };

  const handleEdit = () => {
    setEditableNote({ note, index });
    handleClose();
  };
  return (
    <FieldAdjustmentWrapper>
      <IconParentWrapper>
        {' '}
        <IconWrapper aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon style={{ color: '#CCCCCC' }} />
        </IconWrapper>
      </IconParentWrapper>
      <StyledPopover
        PaperProps={{ elevation: 2 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <ContentWrapper>
          <List component="nav">
            <ListItem button onClick={handleEdit}>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button onClick={handleDelete}>
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </ContentWrapper>
      </StyledPopover>
    </FieldAdjustmentWrapper>
  );
}

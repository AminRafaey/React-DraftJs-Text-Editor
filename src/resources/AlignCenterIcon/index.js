import React from 'react';
import Normal from './Normal.png';
import Selected from './Selected.png';
import PropTypes from 'prop-types';
import { styled, Box } from '@material-ui/core';

const iconParentStyle = {
  height: 30,
  width: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const IconWrpper = styled(Box)({
  '&:hover': {
    backgroundColor: '#eeeeee',
  },

  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AlignCenter = (props) => {
  const { selected } = props;
  return (
    <div
      style={{
        ...iconParentStyle,
      }}
    >
      <IconWrpper>
        <img
          src={selected ? Selected : Normal}
          style={{ height: 24, width: 24 }}
        />
      </IconWrpper>
    </div>
  );
};

AlignCenter.defaultProps = {
  color: '#757575',
};

AlignCenter.propTypes = {
  color: PropTypes.string,
};

export default AlignCenter;

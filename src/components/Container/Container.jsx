import React from 'react';
import PropTypes from 'prop-types';

import './Container.css';

function Container(props) {
  const { children } = props;
  return (
    <div className="Container">
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node
};

export default Container;

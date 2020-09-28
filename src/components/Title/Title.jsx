import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Title.css';

export function Title(props) {
  const { linkProps, title } = props;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="Title">
      <h1 className="Title__title">{title}</h1>
      {linkProps && (<Link className="Title__button" {...linkProps} />)}
    </div>
  );
}

Title.propTypes = {
  linkProps: PropTypes.object,
  title: PropTypes.string.isRequired
};

export default memo(Title);

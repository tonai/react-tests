import PropTypes from 'prop-types';

export default PropTypes.shape({
  category: PropTypes.number,
  content: PropTypes.string,
  id: PropTypes.number,
  published: PropTypes.bool,
  title: PropTypes.string
});

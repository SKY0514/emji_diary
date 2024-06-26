import './Button.css';
import PropTypes from "prop-types";
const Button = ({ text = "확인", type, onClick, disabled }) => {
  return (
    <button
      className={`Button Button_${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};


export default Button;

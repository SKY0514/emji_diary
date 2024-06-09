import './Button.css';
const Button = ({ text = '확인', type, onClick }) => {
    return (
        <button className={`Button Button_${type}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;

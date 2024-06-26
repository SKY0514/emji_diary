import "./EmotionItem.css";
import { getEmogiImg } from "@/utils/getEmojiInfo";
import PropTypes from "prop-types";
const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
      onClick={onClick}
    >
      <img className="emotion_img" src={getEmogiImg(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

EmotionItem.propTypes = {
  emotionId: PropTypes.number,
  emotionName: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};
export default EmotionItem;

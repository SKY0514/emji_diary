import { getEmogiImg } from "@/utils/getEmojiInfo";
import "./DiaryItem.css";
import Button from "./Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const DiaryItem = ({ id, createAt, emotionId, content, onClick }) => {
  const nav = useNavigate();
  const goToEditPage = (e) => {
    nav(`/edit/${id}`);
    e.stopPropagation();
  };
  return (
    <div className="DiaryItem" onClick={onClick}>
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmogiImg(emotionId)} />
      </div>
      <div className="info_section">
        <div className="created_date">
          {new Date(createAt).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button text="수정하기" onClick={goToEditPage} />
      </div>
    </div>
  );
};

DiaryItem.propTypes = {
  id: PropTypes.number.isRequired,
  createAt: PropTypes.string,
  emotionId: PropTypes.number,
  content: PropTypes.string,
  onClick: PropTypes.func,
};

export default DiaryItem;

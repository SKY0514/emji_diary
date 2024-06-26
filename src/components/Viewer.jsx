import "./Viewer.css";
import EmotionItem from "@/components/EmotionItem";
import PropTypes from "prop-types";
const Viewer = ({ emotionInfo, content }) => {
  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div
          className={`emotion_img_wrapper emotion_img_wrapper_${emotionInfo.emotionId}`}
        >
          <EmotionItem
            emotionId={emotionInfo.emotionId}
            emotionName={emotionInfo.emotionName}
            isSelected={true}
          />
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

Viewer.propTypes = {
  emotionInfo: PropTypes.object,
  content: PropTypes.string,
};
export default Viewer;

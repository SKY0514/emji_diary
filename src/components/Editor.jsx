import EmotionItem from "@/components/EmotionItem";
import "./Editor.css";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext } from "@/App";
import { emotionList } from "@/utils/getEmojiInfo";
import { useNavigate } from "react-router-dom";
import useDiary from "@/hooks/useDiary";
import { deteFormatted } from "@/utils/dateFormat";
import PropTypes from "prop-types";

const Editor = ({ id }) => {
  const nav = useNavigate();

  var editData = useDiary(id);

  const [diaryInfo, setDiaryInfo] = useState({
    createAt: deteFormatted(new Date()),
    emotionId: 0,
    content: "",
  });

  const [isWriteDisabled, setIsWriteDisabled] = useState(true);
  const { onCreate, onUpdate } = useContext(DiaryDispatchContext);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setDiaryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onWirteComplete = () => {
    if (id) {
      const res = window.confirm("일기를 수정하시겠습니까?");
      if (!res) return;

      onUpdate(id, diaryInfo.emotionId, diaryInfo.content);
      nav("/", { replace: true });
      return;
    }

    onCreate(diaryInfo.createAt, diaryInfo.emotionId, diaryInfo.content);
    nav("/", { replace: true });
  };

  useEffect(() => {
    if (diaryInfo.createAt && diaryInfo.emotionId && diaryInfo.content) {
      return setIsWriteDisabled(false);
    }
    setIsWriteDisabled(true);
  }, [diaryInfo]);

  useEffect(() => {
    if (!editData) {
      return;
    }

    setDiaryInfo(editData);
  }, [editData]);
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createAt"
          type="date"
          value={diaryInfo.createAt}
          onChange={handleInputChange}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((list) => (
            <EmotionItem
              emotionId={list.emotionId}
              emotionName={list.emotionName}
              isSelected={list.emotionId === diaryInfo.emotionId}
              key={list.emotionId}
              onClick={() => {
                handleInputChange({
                  target: {
                    name: "emotionId",
                    value: list.emotionId,
                  },
                });
              }}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          placeholder="오늘은 어땠나요?"
          name="content"
          value={diaryInfo.content}
          onInput={handleInputChange}
        />
      </section>
      <section className="button_section">
        <Button
          text={"취소하기"}
          onClick={() => {
            nav(-1);
          }}
        />
        <Button
          text={"작성완료"}
          type={"POSITIVE"}
          disabled={isWriteDisabled}
          onClick={onWirteComplete}
        />
      </section>
    </div>
  );
};

Editor.propTypes = {
  id: PropTypes.string,
};

export default Editor;

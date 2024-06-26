import { useContext, useState, useEffect } from "react";
import { DiaryContext } from "@/App";
import { useNavigate } from "react-router-dom";
const useDiary = (id) => {
  const data = useContext(DiaryContext);
  const nav = useNavigate();
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    if (!id) return;
    const res = data.find((list) => list.id == id);
    if (!res) {
      alert("존재하지 않는 일기입니다.");
      nav(-1, { replace: true });
      return;
    }

    setCurDiaryItem({ ...res, createAt: res.createAt });
  }, []);

  return curDiaryItem;
};

export default useDiary;

import Header from "@/layouts/Header";
import Button from "@/components/Button";
import DiaryList from "@/components/DiaryList";
import { useContext, useState } from "react";
import { DiaryContext } from "@/App";
import useTitle from "@/hooks/useTitle";
const Home = () => {
  useTitle("감정 일기장");
  const [date, setDate] = useState(new Date());
  const diaryDataList = useContext(DiaryContext);
  const filteredDiary = () => {
    const startMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
      0,
      0,
      0
    );
    const endMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    return diaryDataList.filter(
      (list) =>
        startMonth <= new Date(list.createAt) &&
        new Date(list.createAt) <= endMonth
    );
  };

  const onIncreaseMonthBtn = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };
  const onDecreaseMonthBtn = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  return (
    <>
      <Header
        title={date.getFullYear() + "년 " + (date.getMonth() + 1) + "월"}
        leftChild={<Button text={"<"} onClick={onDecreaseMonthBtn} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonthBtn} />}
      />

      <DiaryList diaryList={filteredDiary()} />
    </>
  );
};

export default Home;

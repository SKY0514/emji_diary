import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
const DiaryList = ({ diaryList = [] }) => {
  const [sortType, setSortType] = useState("latest");
  const nav = useNavigate();
  const goToCreatePage = () => {
    nav("/new");
  };

  const changeSortType = (e) => {
    setSortType(e.target.value);
  };

  const sortedList = () => {
    if (sortType == "oldest") {
      return diaryList.sort(
        (a, b) => new Date(a.createAt) - new Date(b.createAt)
      );
    }

    return diaryList.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
  };

  const goToDetail = useCallback((id) => {
    nav(`/detail/${id}`);
  }, []);
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={changeSortType} value={sortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button text="새 일기 쓰기" onClick={goToCreatePage} />
      </div>
      <div className="list_wrapper">
        {sortedList().map((list) => (
          <DiaryItem
            key={list.id}
            {...list}
            onClick={() => {
              goToDetail(list.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

DiaryList.propTypes = {
  diaryList: PropTypes.array,
};
export default DiaryList;

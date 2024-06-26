import { useNavigate, useParams } from "react-router-dom";
import Header from "@/layouts/Header";
import Button from "@/components/Button";
import Editor from "@/components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "@/App";
import useTitle from "@/hooks/useTitle";
const Write = () => {
  const { id } = useParams();
  const nav = useNavigate();
  useTitle(id ? "일기 수정하기" : "일기 쓰기");

  const { onDelete } = useContext(DiaryDispatchContext);

  const handleDeleteBtn = () => {
    const res = window.confirm(
      "일기를 정말 삭제하시겠습니까? 다시 복구 되지 않습니다."
    );
    if (!res) return;
    onDelete(id);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={id ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          id ? (
            <Button
              text={"삭제하기"}
              type="NEGATIVE"
              onClick={handleDeleteBtn}
            />
          ) : null
        }
      />
      <div>
        <Editor id={id} />
      </div>
    </div>
  );
};

export default Write;

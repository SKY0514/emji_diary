import Header from "@/layouts/Header";
import { useNavigate, useParams } from "react-router-dom";
import { emotionItem } from "@/utils/getEmojiInfo";
import useDiary from "@/hooks/useDiary";
import Button from "@/components/Button";
import Viewer from "@/components/Viewer";
import useTitle from "@/hooks/useTitle";

const Datail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  useTitle(`${id}번 일기`);

  const detailInfo = useDiary(id);
  if (!detailInfo) {
    return;
  }

  const { createAt, emotionId, content } = detailInfo;
  const goToHome = () => {
    nav("/");
  };

  const goToEdit = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="Detail">
      <Header
        title={createAt + " 기록"}
        leftChild={<Button text="뒤로가기" onClick={goToHome} />}
        rightChild={<Button text="수정하기" onClick={goToEdit} />}
      ></Header>
      <Viewer emotionInfo={emotionItem(emotionId)} content={content} />
    </div>
  );
};
export default Datail;

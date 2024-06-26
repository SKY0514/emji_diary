import { useEffect } from "react";
const useTitle = (text) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = text;
  }, []);
};

export default useTitle;

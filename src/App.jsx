import { Outlet } from "react-router-dom";
import { createContext, useEffect, useReducer, useRef, useState } from "react";
export const DiaryContext = createContext();
export const DiaryDispatchContext = createContext();

function reducer(state, actions) {
  let data;
  switch (actions.type) {
    case "INIT":
      return actions.data;
    case "CREATE":
      data = [actions.data, ...state];
      break;
    case "UPDATE":
      data = state.map((list) =>
        list.id == actions.data.id ? { ...list, ...actions.data } : list
      );
      break;
    case "DELETE":
      data = state.filter((list) => list.id != actions.data.id);
      break;
    default:
      break;
  }

  localStorage.setItem("diaryItem", JSON.stringify(data));
  return data;
}

function App() {
  const idRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("diaryItem"));
    if (!storageData) {
      setIsLoading(false);
      return;
    }
    const maxId = Math.max(...storageData.map((data) => data.id));
    idRef.current = maxId;
    dispatch({ type: "INIT", data: storageData });
    setIsLoading(false);
  }, []);

  //ADD Fun
  const onCreate = (createAt, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: { id: ++idRef.current, createAt, emotionId, content },
    });
  };
  //Edit Fun
  const onUpdate = (id, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        emotionId,
        content,
      },
    });
  };

  //Delete Fun
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data: { id },
    });
  };

  if (isLoading) {
    return;
  }

  return (
    <DiaryContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Outlet />
      </DiaryDispatchContext.Provider>
    </DiaryContext.Provider>
  );
}

export default App;

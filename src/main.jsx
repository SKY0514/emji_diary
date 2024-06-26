import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './views/Home.jsx';
import Write from './views/Write.jsx';
import Detail from "./views/Detail.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./views/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/new",
        element: <Write />,
      },
      {
        path: "/edit/:id",
        element: <Write />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

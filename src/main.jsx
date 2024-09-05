import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import { Provider } from "react-redux";
import { store } from "./redux";
import "./scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Pages />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

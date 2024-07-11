import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import browser from "webextension-polyfill";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

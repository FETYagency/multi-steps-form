import React from "react";
import ReactDOM from "react-dom/client";
import FormApp from "./app";
import store from "./services/store/store";
import { Provider } from "react-redux";
import "./main.css";
async function deferRender() {
  const { worker } = await import("./mocks/browser");
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <FormApp />
      </Provider>
    </React.StrictMode>,
  );
});

import React from "react";
import ReactDOM from "react-dom/client";

export function renderPage(page: React.ReactElement) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>{page}</React.StrictMode>,
  );
}

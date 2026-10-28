import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { COMPONENT_DOCS } from "../lib/docs/component-catalog";
import { pageMetadata } from "./page-metadata";

export const routes = [
  "/",
  "/components",
  "/docs",
  "/packages",
  "/registry",
  ...COMPONENT_DOCS.map(({ slug }) => `/components/${slug}`),
];
export function render(url: string) {
  return {
    html: renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
    ),
    ...pageMetadata(url),
  };
}

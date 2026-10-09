import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ErrorMessagePreview } from "../../components/docs/previews/preview-feedback";
import { PageHeaderPreview } from "../../components/docs/previews/preview-controls";

import { PageTemplatePreview, RadialMenuOverlayPreview } from "../../components/docs/previews/preview-navigation";

afterEach(cleanup);

describe("interactive docs previews", () => {
  it("retries the error demo and lets the visitor reset it", () => {
    render(<ErrorMessagePreview />);
    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));
    expect(screen.getByText("Build completed.")).toBeInTheDocument();
    expect(screen.queryByText("Build failed")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
    expect(screen.getByText("Build failed")).toBeInTheDocument();
  });

  it("toggles the viewer control in both directions", () => {
    render(<PageHeaderPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Hide viewer" }));
    fireEvent.click(screen.getByRole("button", { name: "Show viewer" }));
    expect(screen.getByRole("button", { name: "Hide viewer" })).toBeInTheDocument();
  });
  it("changes page content with the selected tab", () => {
    render(<PageTemplatePreview />);
    fireEvent.click(screen.getByRole("tab", { name: "Tokens" }));
    expect(screen.getByText(/Import @steez-ui\/theme\/tokens.css once/)).toBeInTheDocument();
    expect(screen.queryByText(/This card sits inside/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Overview" }));
    expect(screen.getByText(/This card sits inside/)).toBeInTheDocument();
  });

  it("closes and reopens the radial navigation demo", () => {
    render(<RadialMenuOverlayPreview />);
    fireEvent.click(screen.getByTitle("Close navigation"));
    expect(screen.queryByRole("dialog", { name: "Site navigation" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(screen.getByTitle("Close navigation")).toBeInTheDocument();
  });

});

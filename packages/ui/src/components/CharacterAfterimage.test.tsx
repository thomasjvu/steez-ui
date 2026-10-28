import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { CharacterAfterimage } from "./CharacterAfterimage";
import { Section } from "./Section";
afterEach(cleanup);
it("bounds invalid artwork values and keeps only the foreground image accessible", () => {
  const { container } = render(<CharacterAfterimage src="/character.png" alt="Character"
    ghostCount={NaN} ghostOffset={Infinity} cycleDurationMs={NaN} entranceDurationMs={Infinity} entrance />);
  expect(screen.getAllByRole("img")).toHaveLength(1);
  expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  expect(container.querySelector("span")?.style.getPropertyValue("--afterimage-cycle-duration")).toBe("3000ms");
});
it("keeps zero-valued section titles", () => {
  render(<Section title={0}>Body</Section>);
  expect(screen.getByRole("heading", { name: "0" })).toBeTruthy();
});

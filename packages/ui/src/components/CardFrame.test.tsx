import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Card } from "./Card";
import { QuickInfoCard } from "./QuickInfoCard";
import { StatCard } from "./StatCard";

afterEach(cleanup);

it("preserves numeric card titles instead of hiding zero", () => {
  render(<Card title={0}>Body</Card>);
  expect(screen.getByText("0")).toHaveClass("title");
});

it("shares one corner-bracket style across Card, QuickInfoCard and StatCard", () => {
  const { container } = render(<>
    <Card variant="brackets" data-testid="card">Body</Card>
    <QuickInfoCard items={[]} data-testid="quick" />
    <QuickInfoCard items={[]} showCornerBrackets={false} data-testid="plain" />
    <StatCard label="Errors" value={0} brackets data-testid="stat" />
  </>);
  const bracketClass = (id: string) =>
    [...(container.querySelector(`[data-testid="${id}"]`)?.classList ?? [])].filter(name => /brackets/.test(name));
  expect(bracketClass("card")).toHaveLength(1);
  expect(bracketClass("quick")).toEqual(bracketClass("card"));
  expect(bracketClass("stat")).toEqual(bracketClass("card"));
  expect(bracketClass("plain")).toEqual([]);
});

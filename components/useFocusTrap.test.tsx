import { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap } from "@/components/useFocusTrap";

function FocusTrapFixture({
  active,
  onEscape,
}: {
  active: boolean;
  onEscape?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(active, containerRef, onEscape);

  return (
    <div ref={containerRef} tabIndex={-1}>
      <button type="button">Premier</button>
      <button type="button">Dernier</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("appelle onEscape quand la touche Escape est pressée", async () => {
    const user = userEvent.setup();
    const onEscape = jest.fn();

    render(<FocusTrapFixture active onEscape={onEscape} />);

    await user.keyboard("{Escape}");

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("n'appelle pas onEscape quand le piège est inactif", async () => {
    const user = userEvent.setup();
    const onEscape = jest.fn();

    render(<FocusTrapFixture active={false} onEscape={onEscape} />);

    await user.keyboard("{Escape}");

    expect(onEscape).not.toHaveBeenCalled();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounter } from "./MyCounter";

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubtract: handleSubtractMock,
        handleReset: handleResetMock,
    })
}));

describe('MyCounter2', () => {
    test('should render the component', () => {
        render(<MyCounter />)

        expect(screen.getByRole('heading', {
            level: 1
        }).innerHTML).toContain(`counter: 20`);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    })

    test('should call handleAdd if button is clicekd', () => {
        render(<MyCounter />);

        const button = screen.getByRole('button', { name: '+1' });

        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleSubtractMock).not.toHaveBeenCalled();
    })
})
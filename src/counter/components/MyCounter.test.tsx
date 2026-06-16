import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounter } from "./MyCounter";

describe('MyCounter', () => {
    test('should render the component', () => {
        render(<MyCounter />)

        expect(screen.getByRole('heading', {
            level: 1
        }).innerHTML).toContain(`counter: 10`);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    })

    test('should increment the counter', () => {
        render(<MyCounter />)

        const labelH1 = screen.getByRole('heading', { level: 1 });
        const button = screen.getByRole('button', { name: '+1' });

        fireEvent.click(button);

        expect(labelH1.innerHTML).toContain(`counter: 11`)
    })
})
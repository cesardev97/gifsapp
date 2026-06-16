import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe('CustomHeader', () => {
    const title = 'Buscar Gifs';

    test('should match snapshot', () => {
        const { container } = render(<CustomHeader title={title} />);

        expect(container).toMatchSnapshot();
    })

    test('should render the title correctly', () => {

        // const { container } = render(<CustomHeader title={title} />);
        // expect(container.querySelector('h1')?.innerHTML).toBe(title);
        render(<CustomHeader title={title} />);

        expect(screen.getByText(title)).toBeDefined();
    });

    test('should render the description when provided', () => {
        const description = 'Descubre y comparte el Gif perfecto';

        // const { container } = render(<CustomHeader title={title} description={description} />);
        // expect(container.querySelector('p')?.innerHTML).toBe(description);
        render(<CustomHeader title={title} description={description} />);

        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });

    test('should not render descriptoin when not provided', () => {

        const { container } = render(<CustomHeader title={title} />);
        screen.debug();

        expect(container.querySelector('p')?.innerHTML).not.toBeDefined();
    })
})
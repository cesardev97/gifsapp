import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import * as gifActions from "../actions/get-gifs-by-query";

describe('useGifs', () => {

    test('should return default values and methods', () => {

        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClick).toBeDefined();
    })


    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => await result.current.handleSearch('goku'));

        expect(result.current.gifs.length).toBe(10);
    })

    test('should return a list of gifs when handleTermClick is called', async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => await result.current.handleTermClick('naruto'));

        expect(result.current.gifs.length).toBe(10);
    })

    test('should return a list of gifs from cache', async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => await result.current.handleTermClick('naruto'));

        vi.spyOn(gifActions, 'getGifsByQuery') //Quiero que lance una exception
            .mockRejectedValue(new Error('This is my custom test error'));

        await act(async () => await result.current.handleTermClick('naruto'));

        expect(result.current.gifs.length).toBe(10);

    })

    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());

        const spy = vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => await result.current.handleSearch('goku1'));
        await act(async () => await result.current.handleSearch('goku2'));
        await act(async () => await result.current.handleSearch('goku3'));
        await act(async () => await result.current.handleSearch('goku4'));
        await act(async () => await result.current.handleSearch('goku5'));
        await act(async () => await result.current.handleSearch('goku6'));
        await act(async () => await result.current.handleSearch('goku7'));
        await act(async () => await result.current.handleSearch('goku8'));
        await act(async () => await result.current.handleSearch('goku9'));

        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
            'goku9', 'goku8',
            'goku7', 'goku6',
            'goku5', 'goku4',
            'goku3', 'goku2'
        ]);

        spy.mockRestore();

    })

    // Extra

    test('should return if the query length is 0 or preiousTerms includes query', async () => {
        const { result } = renderHook(() => useGifs());

        const spy = vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => await result.current.handleSearch(''));

        expect(spy).not.toHaveBeenCalled();
        expect(result.current.gifs).toEqual([]);

        spy.mockRestore();
    })

    test('should not search when term already exists', async () => {
        const { result } = renderHook(() => useGifs());

        const spy = vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => await result.current.handleSearch('goku'));

        expect(spy).toHaveBeenCalledTimes(1);

        await act(async () => await result.current.handleSearch('goku'));

        expect(spy).toHaveBeenCalledTimes(1);
    })
})
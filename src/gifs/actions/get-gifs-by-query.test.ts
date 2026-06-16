import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query";

import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from './../../../tests/mock/giphy.response.data';

import AxiosMockAdapter from 'axios-mock-adapter';

describe('getGifsByQuery', () => {

    let mock = new AxiosMockAdapter(giphyApi);


    beforeEach(() => {
        // mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    })

    // test('should return a list of gifs', async () => {
    //     const gifs = await getGifsByQuery('goku');
    //     const [gif1] = gifs;

    //     expect(gifs.length).toBe(10);

    //     expect(gif1).toEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String)
    //     })
    // })}

    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('goku');

        expect(gifs.length).toBe(10);

        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.width).toBe('number');
        })
    })

    test('should return an empty list of gifs is query is empty', async () => {
        // mock.onGet('/search').reply(200, { data: [] });

        mock.restore();

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);
    })

    test('should handle error when the API returns an error', async () => {

        const consoleErrorSpy = vi.spyOn(console, 'error')
            .mockImplementation(() => { //Funcion flecha ya que error es un metodo/funcion
                // Esto se ejecuta en lugar de la implementacion propa del error
                // console.log('Hola ');
                // console.log('mundo');
            });

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        })

        const gifs = await getGifsByQuery('goku');

        expect(gifs.length).toBe(0)
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());

    })
})
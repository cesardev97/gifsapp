import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query";
import type { Gif } from "../interfaces/gif.interface";

// const gifsCache: Record<string, Gif[]> = {}

export const useGifs = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifs, setGifs] = useState<Gif[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClick = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);

        gifsCache.current[term] = gifs;
    }

    const handleSearch = async (query: string = '') => {

        const formatQuery = query.toLowerCase().trim();

        if (formatQuery.length === 0 || previousTerms.includes(formatQuery)) return;

        setPreviousTerms([formatQuery, ...previousTerms].splice(0, 8))

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);

        gifsCache.current[query] = gifs;
    }

    return {
        gifs,
        previousTerms,
        handleTermClick,
        handleSearch
    }
}

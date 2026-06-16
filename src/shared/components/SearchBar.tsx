import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
    placeholder?: string;
    textButton?: string;
    onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = 'Buscar', textButton = 'Buscar', onQuery }: Props) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!query.trim()) return;

        const timeoutId = setTimeout(() => {
            // onQuery(query);
            handleSearch();
        }, 900);

        return () => {
            clearTimeout(timeoutId)
        }
    }, [query]);
    // }, [query, onQuery]);

    const handleSearch = () => {
        onQuery(query)
        setQuery('');
    }

    const handleKeyEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={({ target }) => setQuery(target.value)}
                onKeyDown={(handleKeyEnter)}
            />
            <button onClick={handleSearch}>{textButton}</button>
        </div>
    )
}

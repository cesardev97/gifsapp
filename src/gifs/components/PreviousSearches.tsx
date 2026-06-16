interface Props {
    searches: string[];
    onTermClicked: (term: string) => void;
}

export const PreviousSearches = ({ searches, onTermClicked }: Props) => {

    return (
        <div className="previous-searches">
            <h2>Busquedas previas</h2>
            <ul className="previous-searches-list">
                {
                    searches.map((term) => (
                        <li key={term} onClick={() => onTermClicked(term)}>{term}</li>
                    ))
                }
            </ul>
        </div>
    )
}

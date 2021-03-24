import {SearchResult} from "../../pages/api/search";

interface SearchResultProps {
    results: SearchResult[]
}

export default function SearchResults({results}: SearchResultProps) {
    return (
        <div>
            <ul>
                {results.map(e => (
                    <li key={e.symbol}>
                        {e.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
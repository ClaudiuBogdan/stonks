import Link from 'next/link'
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
                        <Link href={`/markets/${encodeURIComponent(e.symbol)}`}>
                            <a>{e.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
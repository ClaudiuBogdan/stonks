import {MouseEventHandler} from "react";
import Link from 'next/link'
import {SearchResult} from "../../pages/api/search";
import styles from './styles/Search.module.scss';

interface SearchResultProps {
    results?: SearchResult[]
    searchTerm?: string
    onClick?: MouseEventHandler<any>
    isLoading?: boolean
    maxResults?: number
}

export default function SearchResults({results, isLoading, onClick, searchTerm, maxResults = 5}: SearchResultProps) {
    const hasNoResults = !isLoading && results && results.length === 0 && searchTerm
    return (
        <div>
            {results &&
            results
                .slice(maxResults)
                .map(e => (
                    <Link key={e.symbol} href={`/markets/${encodeURIComponent(e.symbol)}`}>
                        <div
                            className={styles['result-item']}
                            onClick={onClick}>
                            <div style={{fontWeight: 500}}>
                                {e.symbol}
                            </div>
                            <div style={{fontWeight: 300}}>
                                {e.name}
                            </div>
                        </div>
                    </Link>
                ))}

            {hasNoResults && (
                <div className={styles['result-no-data']}>
                    No data
                </div>
            )}
        </div>
    )
}
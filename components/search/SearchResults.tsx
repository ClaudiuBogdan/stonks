import {MouseEventHandler} from "react";
import Link from 'next/link'
import {SearchResult} from "../../pages/api/search";
import styles from './styles/Search.module.scss';
import loaderStyles from './styles/Loader.module.scss';

interface SearchResultProps {
    results?: SearchResult[]
    searchTerm?: string
    onClick?: MouseEventHandler<any>
    isLoading?: boolean
    isError?: boolean
    maxResults?: number
}

export default function SearchResults({
                                          results,
                                          isError,
                                          isLoading,
                                          onClick,
                                          searchTerm,
                                          maxResults = 5
                                      }: SearchResultProps) {

    const hasNoResults = !isLoading && results && results.length === 0 && searchTerm

    return (
        <div>
            {results && results
                .slice(0, maxResults)
                .map(e => (
                    <Link key={e.symbol} href={`/markets/${encodeURIComponent(e.symbol)}`}>
                        <div
                            className={styles['result-item']}
                            onClick={onClick}>
                            <div style={{fontWeight: 500}}>
                                {e.symbol}
                            </div>
                            <div style={{fontWeight: 300}}>
                                {e.description}
                            </div>
                        </div>
                    </Link>
                ))}

            {hasNoResults && (
                <div className={styles['result-no-data']}>
                    No data
                </div>
            )}

            {searchTerm && isLoading && <div className={loaderStyles['loader']}>Loading...</div>}

            {isError && <span>Error occurred</span>}
        </div>
    )
}
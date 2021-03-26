import {useState} from "react";
import styles from './Search.module.scss';
import useSearch from "../../utils/search";
import SearchResults from "./SearchResults";

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const {results, isLoading, isError} = useSearch(searchTerm)

    return (
        <div className={styles['search-container']}>
            <div className={styles.field}>
                <input
                    className={styles['search-input']}
                    id="search"
                    value={searchTerm}
                    type='text'
                    autoComplete='off'
                    placeholder={'Search market'}
                    onChange={event => setSearchTerm(event.target.value)}
                />
            </div>

            <div className={styles['results-container']}>
                {isError && <div>Error</div>}
                <SearchResults
                    {...{
                        isLoading,
                        results,
                        searchTerm
                    }}
                    onClick={() => setSearchTerm('')}/>
            </div>
        </div>
    )
}

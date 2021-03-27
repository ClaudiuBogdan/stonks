import {useState} from "react";
import styles from './Search.module.scss';
import useSearch from "../../utils/search";
import SearchResults from "./SearchResults";
import useDebounce from "../../utils/debounce";

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isFocused, setIsFocused] = useState(false)

    const isFocusedDebounced = useDebounce<boolean>(isFocused, 300)

    const {results, isLoading, isError} = useSearch(searchTerm)
    console.log('Is Focused: ', isFocused)
    return (
        <div className={styles['search-container']}>

            <div className={styles.field}>
                <input
                    className={styles['search-input']}
                    id="search"
                    value={searchTerm}
                    type="search"
                    autoComplete='off'
                    placeholder={'Search market'}
                    onClick={() => setIsFocused(true)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(key) => {
                        if(key.key === 'Esc' || key.key === 'Escape'){
                            setIsFocused(false)
                        }
                    } }
                    onChange={event => setSearchTerm(event.target.value)}
                />
            </div>

            <div className={styles['results-container']}>
                {isError && <div>Error</div>}
                {isFocusedDebounced && (
                    <SearchResults
                        {...{
                            isLoading,
                            results,
                            searchTerm
                        }}
                        onClick={() => setSearchTerm('')}/>
                )}
            </div>
        </div>
    )
}

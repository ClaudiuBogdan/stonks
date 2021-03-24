import {useState} from "react";
import styles from './Search.module.scss';
import useSearch from "../../utils/search";

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const {results, isLoading, isError} = useSearch(searchTerm)

    return (
        <div className={styles.error}>
            <div className={styles.field}>
                <label htmlFor="search">Search for a book</label>
            </div>
            <div className={styles.field}>
                <input
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    id="search"
                />
            </div>

            <div>
                <p>Search term:</p>
                {
                    isLoading ?
                        (<p>loading...</p>) :
                        (<p>{JSON.stringify(results)}</p>)
                }
                {
                    isError && <div>Error</div>
                }
            </div>
        </div>
    )
}

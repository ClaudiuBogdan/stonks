import {useState} from "react";
import useDebounce from "../../utils/debounce";
import styles from './Search.module.scss';

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedValue = useDebounce(searchTerm, 300)

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
                <p>{JSON.stringify(debouncedValue)}</p>
            </div>
        </div>
    )
}

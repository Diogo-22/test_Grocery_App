const SearchItem = ({items, search, setSearch }) => {
   /*  console.log(search)
    console.log(items.filter(item => item[0].toLowerCase().includes(search.toLowerCase()))) */
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='search'>Search</label>
            <input
                id='search'
                type='text'
                role='searchbox'
                placeholder='Search Items'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default SearchItem

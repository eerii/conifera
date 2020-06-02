import React from 'react'


const Search = ({searchVal, setSearchVal}) => {
    return (
        <div>
            Search: <input value={searchVal} onChange={event => setSearchVal(event.target.value)}/>
        </div>
    )
}

export default Search
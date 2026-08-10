import React from 'react'

function SearchBar({type,name,placeholder,...props}) {
  return (
    <input type={type} name={name} placeholder={placeholder} {...props}/>
 
  )
}

export default SearchBar

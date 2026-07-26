import React from 'react'

function Input({type,name,placeholder,...props}) {
  return (
    <input type={type} name={name} placeholder={placeholder} {...props}/>
 
  )
}

export default Input

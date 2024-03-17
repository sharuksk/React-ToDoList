import React from 'react'

const Footer = ({length}) => {
    const year = new Date();
  return (
    
    <footer><p>{length} {length ===1 ? "Item" : "Items"} Listed </p>
      Copyright &copy; {year.getFullYear()}
      </footer>
  )
}

export default Footer
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const LineItem = ({item, handleCheck, handleDelete}) => {
  return (
        <li className="item" key={item.id}>
            <input
            type="checkbox"
            onChange={()=> handleCheck(item.id)}
            checked={item.checked}
            />

            <label
            style={(item.checked? {textDecoration: 'line-through'}: null)}
            onDoubleClick={()=> handleCheck(item.id)}
            >{item.text}</label>

            <button> <FaRegTrashAlt
            role = "button"
            onClick={()=> handleDelete(item.id)}
            tabIndex="0"
            aria-label={`Delete ${item.item}`}
            /></button>
        </li>
  )
}

export default LineItem
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import './App.css';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo_list'))                      
    )

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');

    const addItem = (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const addNewItem = {id, checked:false, text:item}
      const listItems = [...items, addNewItem]
      setItems(listItems)
      console.log(items);
      localStorage.setItem("todo_list", JSON.stringify(listItems))
    } 

    const handleCheck = (id) => {
    const listItem = items.map((item) => 
    item.id===id ? {...item, checked: !item.checked} : item )

    setItems(listItem);
    localStorage.setItem("todo_list", JSON.stringify(listItem))
    }

    const handleDelete = (id) => {
    const listItem = items.filter((item) => item.id!==id )

    setItems(listItem);
    localStorage.setItem("todo_list", JSON.stringify(listItem))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newItem) return;
        console.log(newItem);
        addItem(newItem)
        setNewItem('')  
    }

  return (
    <div className="App">
       <Header title="Header of To-Do List"/>
       <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
       />
       <SearchItem
        search={search}
        setSearch={setSearch}
       />
       <Content
        items = {items.filter(item => ((item.text).toLowerCase()).includes(search.toLocaleLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
       />
       <Footer
       length = {items.length}
       />
    </div>
  );
}

export default App;

import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import './App.css';

function App() {
    const [items, setItems] = useState(
      [
        {
          id:1,
          checked: true,
          text: "Do Workout"
        },
        {
          id:2,
          checked: true,
          text: "Study React"
        },
        {
          id:3,
          checked: true,
          text: "Eat Flakes"
        },
        {
          id:4,
          checked: true,
          text: "Wake Early"
        }

      ]                          
    )
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

  return (
    <div className="App">
       <Header title="Header of To-Do List"/>
       <Content
        items = {items}
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

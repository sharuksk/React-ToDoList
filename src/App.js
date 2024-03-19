import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import './App.css';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
    const API_URL = "http://localhost:3500/items";

    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
      const fetchItems = async () => {
        try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error("Data not received");
          const listItems = await response.json();
          setItems(listItems);
          setFetchError(null);
        }
        catch(err){
          setFetchError(err.message)
        }
        finally{
          setIsLoading(false);
        }
      }
      setTimeout(() => {
        (async() => await fetchItems())()}, 2000
        )
    }, [])

    const addItem = async (item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const addNewItem = {id, checked:false, text:item}
      const listItems = [...items, addNewItem]
      setItems(listItems)
      console.log(addNewItem);
      const postOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addNewItem)
      }

      const result = await apiRequest(API_URL, postOptions )
      if(result) setFetchError(result);
    } 

    const handleCheck = async (id) => {
    const listItem = items.map((item) => 
    item.id===id ? {...item, checked: !item.checked} : item )
    setItems(listItem);

    const myItem = listItem.filter((item) => item.id===id)
    console.log(myItem);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions )
    if(result) setFetchError(result);
    }

    const handleDelete = async (id) => {
    const listItem = items.filter((item) => item.id!==id )
    setItems(listItem);

    const deleteOptions = {method: 'DELETE'}
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions )
    if(result) setFetchError(result);
    

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
       <main>
        {isLoading && <p>Items Loading...</p>}
        {fetchError && <p>{`Error: ${fetchError}`} </p>}
        {!isLoading && !fetchError &&
          <Content
          items = {items.filter(item => ((item.text).toLowerCase()).includes(search.toLocaleLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
          />
        }
       </main>
       <Footer
       length = {items.length}
       />
    </div>
  );
}

export default App;

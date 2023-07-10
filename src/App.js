import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';

function App() {
  const API_URL = 'https://axiomatic-marshy-galley.glitch.me/groceries'
 
  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6IkRpb2dvIiwicm9sZXMiOlsyMDAxLDE5ODQsNTE1MF19LCJpYXQiOjE2ODkwMDMwODUsImV4cCI6MTY4OTA4OTQ4NX0.tSZUnNU554UR5nuQ4kxRShtqP2_vdK3gWn9E9dmQYIY'
          }
        });
          const Items = await response.json();
           if (Items) {
            
          console.log(Items);
          console.log();
          
            let name, id, checked;
          const items = Items.map(item => [
            name,
            id,
            checked
          ] = [
            item.name,
            item.id,
            false
          ], )
          console.log(items);
          setItems(items);
        
        }
        setItems([])
        
      } catch (err) {
        console.log(err.stack);
      }
    };
  
    fetchItems();
  }, []);
  

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        itemss={items.filter(item => ((item[0]).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        items={items}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;

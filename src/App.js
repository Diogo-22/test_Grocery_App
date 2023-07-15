import Layout from './Layout';
import LoggerPage from './LoggerPage';
import { useState, useEffect } from 'react';
import MainPage from './MainPage';
import {useNavigate, Route, Routes} from 'react-router-dom'
import Missing from './Missing';


function App() {
  const API_URL = 'https://axiomatic-marshy-galley.glitch.me/groceries'
  const navigate = useNavigate();
 
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [reqType, setReqType] = useState('')
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(false)
  const [bToken, setbToken] = useState('')
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const updateDB = async () => {
      if (logged === false) return console.log('nothing to send');
      

      verifyToken();


      if (reqType === ''){
        return console.log('nothing to send')
      }
      else if (reqType === 'PUT') {
        
         items.map(item => fetch("https://axiomatic-marshy-galley.glitch.me/groceries", {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + bToken
                },
          body: JSON.stringify(
              {
                "name": item.name,
              "id": item.id,
              "checked": `${item.checked}`
            }
          )}))
        setReqType('')
      }
      else if (reqType === newItem) {
        setNewItem('');
        setReqType('') 
        
         fetch("https://axiomatic-marshy-galley.glitch.me/groceries", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + bToken
              },
          body: JSON.stringify(
              {
                "name": newItem.name,
              "id": newItem.id,
              "checked": `${newItem.checked}`
            }
          ) 
        }
       )  
      } 
      else  {
        console.log('Not sure why it reached this log..')
      }
    
   }
    updateDB()
  }, [items])

  useEffect(() => {
  /*   fetch('https://axiomatic-marshy-galley.glitch.me/auth', {
          method: "POST",
          headers: {
            "Content-type": "application/json",
         },
          body: JSON.stringify(
            {
              "user": `${user}`,
            "pwd": `${pwd}`
          }
        )       
        }) */
    if (logged === false) {   
      navigate('/login')
   }
  }, [])

  useEffect(() => {
       const fetchItems = async () => {
       
        if (logged === true) {

          try {
            const response = await fetch(API_URL, {
              headers: {
                'Authorization': 'Bearer ' + bToken
              }
            });
              const Items = await response.json();

              if (Items) {
              const items = Items 
              
              setItems(items);    
            } else {
              setItems([])
            }
          } catch (err) {
            console.log(err.stack);
          }
          setLoading(false)
      }
    };
    fetchItems();
  }, [load]);
 
const addItem = async (item) => {    
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const myNewItem = {
    "name": item,
    "id": id,
    "checked": false
  } 
  const check = await verifyToken();
  if (check === false) return console.log('logged out')
  console.log('this should not be logged');
  
  setNewItem(myNewItem)
  const listItems = [...items, myNewItem];
  setReqType(myNewItem)
  setItems(listItems);
}

const verifyToken = async () => {
  const response = await fetch("https://axiomatic-marshy-galley.glitch.me/verify", {
    method: "POST",
    headers: {
       'Authorization': 'Bearer ' + bToken
      }})
 
if ( response.status !== 200 ) {
  const refresh = await fetch("https://axiomatic-marshy-galley.glitch.me/refresh", {
    method: "GET",
    credentials: 'include'
  })
  if( refresh.status === 200) return console.log('proceed');
  else {setLogged(false)
    navigate('/login')
    return false;
  }
} else return console.log('proceed:)');
}

const handleCheck = (id) => {
  setReqType('PUT')
  const listItems = items.map(item => item.id === id ? {
    "name": item.name,
    "id": id,
    "checked": !item.checked
  }  : item);
  setItems(listItems);
}

const handleDelete = async (id) => { 
  const listItems = items.filter(item => item.id !== id);
  await fetch("https://axiomatic-marshy-galley.glitch.me/groceries", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      'Authorization': 'Bearer ' + bToken
    },
    body: JSON.stringify({
       "id": id
    })
  }
  ) 
  setItems(listItems);
}

const handleSubmit = (e) => {
  e.preventDefault();
  if (!newItem) return;
  addItem(newItem);
}

const loginuser = async () => {
 
      if (user && pwd) {
       const response =  await fetch('https://axiomatic-marshy-galley.glitch.me/auth', {
          method: "POST",
          headers: {
            "Content-type": "application/json",
         },
          body: JSON.stringify(
            {
              "user": `${user}`,
            "pwd": `${pwd}`
          }
        )       
        })
              
        if (response.status === 200) {
          const logIn = await response.json()
        setLogged(true)
        setbToken(logIn.accessToken)
        setLoad(true)
        navigate('/')
       } 
       else {
        alert('Wrong username or password!')
       }
   
      }
    }
  return (
    
    <div className="App">      
      <Routes>
        <Route path="/" element={<Layout 
        items={items}
        />}>
          <Route index element={<MainPage 
          items={items}
          loading={loading}
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
          search={search}
          setSearch={setSearch}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />} />
          <Route path="login" index element={<LoggerPage 
          user={user}
          setUser={setUser}
          pwd={pwd}
          setPwd={setPwd}
          loginuser={loginuser}
          />}/>
          <Route path="*" element={<Missing />}/>
          
        </Route>
      </Routes>

    </div>
  );
}

export default App;

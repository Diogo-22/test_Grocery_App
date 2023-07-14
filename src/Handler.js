import React from 'react'


const addItem = (item) => {    
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {
      "name": item,
      "id": id,
      "checked": false
    } 
    setNewItem(myNewItem)
    const listItems = [...items, myNewItem];
    setReqType(myNewItem)
    setItems(listItems);
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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6IkRpb2dvIiwicm9sZXMiOlsyMDAxLDE5ODQsNTE1MF19LCJpYXQiOjE2ODkxNTIwMDYsImV4cCI6MTY4OTIzODQwNn0.pAKRNFOS7tt3kR_ZN2BGQi1AzzkygOVEeaT7l2une5c'
      },
      body: JSON.stringify({
         "id": id
      })
    }
    )
    //setReqType('PUT')
    setItems(listItems);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
  }

const Handler = () => {
  return (
    <div>Handler</div>
  )
}

export default Handler
import React from 'react'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import Content from './Content'

const MainPage = ({items, loading, newItem, setNewItem, handleSubmit, search, setSearch, handleCheck, handleDelete}) => {
  return (
    <>
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
            loading={loading}
            search={search}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            items={items}
            />
    </>
  )
}

export default MainPage
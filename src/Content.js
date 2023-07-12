import ItemList from './ItemList';

const Content = ({ search, handleCheck, handleDelete, items }) => {
      let searchedItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    //console.log('searchItems')
    return (
        <main>
            {items.length ? (
                
                <ItemList
                    items={searchedItems}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                    
                />
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default Content

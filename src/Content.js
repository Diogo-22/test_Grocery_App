import ItemList from './ItemList';

const Content = ({loading, search, handleCheck, handleDelete, items }) => {
    
        let searchedItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
     
    return (
        <main>
            {items.length ? (
                
                <ItemList
                    items={searchedItems}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                    
                />
            ) : loading === true ? (
                <p style={{ marginTop: '2rem' }}>Your list is loading...</p>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default Content

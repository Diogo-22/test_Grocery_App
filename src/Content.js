import ItemList from './ItemList';

const Content = ({ itemss, handleCheck, handleDelete, items }) => {
    console.log('after');
    console.log(items);
    return (
        <main>
            {items.length ? (
                <ItemList
                
                    items={items}
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

import React, { useState, useEffect } from 'react';
import TodoListItem from './TodoListItem.js';

const TodoList = props => {
    const [state, setState] = useState({ items: [] });
    const [LoadingState, setIsLoading] = useState({ loading: true });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(
                response => response.json()
            )
            .then(
                data => setState({ items: data })
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }, []);

    const addItem = () => {
        var newId = 0;
        if (state.items.length > 0) {
            newId = state.items[state.items.length - 1].id + 1;
        }
        
        var newState = state.items.concat({
            completed: false,
            id: newId,
            title: "New item",
            userId: null
        });
        setState({ items: newState });
    }

    const parentCallback = id => {
        var newArr = state.items.filter(x => x.id !== id);
        setState({ items: newArr });
    }

    const toggleStatusCallback = id => {
        var newArr = [];
        state.items.forEach(x => {
            if (x.id == id) {
                x.completed = !x.completed;
            }
            newArr.push(x);
        });
        setState({ items: newArr });
    }

    const sortItems = () => {
        var sortedArr = [];
        state.items.forEach(item => {
            if (item.completed == false) {
                sortedArr.unshift(item);
            } else {
                sortedArr.push(item);
            }
        });
        setState({ items: sortedArr });
    }

    var infoText = "Loading...";
    if (LoadingState.loading == false) {
        infoText = "No list items here...";
    }
    var content = <div style={{ color: "white", padding: "10px" }}>{infoText}</div>
    if (state.items.length > 0) {
        content = [];
        state.items.map(x => {
            var status = "none";
            if (x.completed == true) {
                status = "completed";
            }
            content.push(<TodoListItem key={x.id} index={x.id} title={x.title} state={status} closeClickedCallback={parentCallback}
                toggleStatusCallback={toggleStatusCallback}></TodoListItem>);
        })
    }

    return (
        <React.Fragment>
            <div className="menu_window">
                <div className="button_panel">
                    <button type="button" id="sort_button" onClick={() => sortItems()}>Sort items</button>
                    <button type="button" id="add_button" onClick={() => addItem()}>Add item</button>
                    <button type="button" id="remove_all_button" onClick={() => {
                        setState({ items: [] });
                        setIsLoading({ loading: false});
                    }}>Remove all</button>
                </div>
            </div>
            <div id="style-1" className="items_placeholder">
                {content}
            </div>
        </React.Fragment>
    );
}

export default TodoList
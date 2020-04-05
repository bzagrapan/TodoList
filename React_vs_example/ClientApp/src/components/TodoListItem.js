import React, { useState,useEffect} from 'react';

const TodoListItem = props => {
    const [titleState, setTitle] = useState("");
    const [indexState, setIndex] = useState(0);
    const [statusState, setStatus] = useState({class: "", text: ""});

    useEffect(() => {
        if (props.state.toLowerCase() == "completed") {
            setTitle(props.title);
            setIndex(props.index);
            setStatus({ class: "completed", text: "COMPLETED" });
        } else {
            setTitle(props.title);
            setIndex(props.index);
            setStatus({ class: "in_progress", text: "IN PROGRESS"});
        }
    }, []);

    const toggleStatus = className => {
        if (className == "completed") {
            setStatus({ class: "in_progress", text: "IN PROGRESS" });
        } else {
            setStatus({ class: "completed", text: "COMPLETED" });
        }
        props.toggleStatusCallback(indexState);
    }

    return (
        <React.Fragment>
            <div className="item">
                <div className="row">
                    <div className="firstRowContent" contentEditable="true" >
                        {titleState}
                    </div>
                    <div className="firstRowButton" onClick={() => props.closeClickedCallback(indexState)}>
                        X
                    </div>
                </div>
                <div className="row">
                    <div className="index">
                        {indexState}
                    </div>
                    <div className={statusState.class} onClick={() => toggleStatus(statusState.class)}>
                        {statusState.text}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TodoListItem
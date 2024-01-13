import "../styles/ListEditor.css";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({ title, handleChangeTitle, deleteList }) => {

    const ref = React.createRef();

    const onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.saveList();
        }
    };

    const handleClick = e => {
        const node = this.ref.current;

        if (node.contains(e.target)) {
            return;
        }

        this.props.onClickOutside();
    };

    function componentDidMount() {
        document.addEventListener("click", handleClick, false);
    }

    function componentWillUnmount() {
        document.removeEventListener("click", handleClick, false);
    }

    return (
        <div className="list-title-edit" ref={ref}>
            <TextareaAutosize
                autoFocus
                className="list-title-textarea"
                placeholder="Enter list title..."
                value={title}
                onChange={handleChangeTitle}
                onKeyDown={onEnter}
                style={{ width: deleteList ? 220 : 245 }}
            />
            {deleteList && <ion-icon name="trash" onClick={deleteList} />}
        </div>
    );
}

export default ListEditor;

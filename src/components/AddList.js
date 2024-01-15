import "../styles/AddList.css";

import React, {useState} from "react";
import {useDispatch} from "react-redux";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import EditButtons from "./EditButtons";
import * as actionTypes from "../redux/actionTypes";

const AddList = ({toggleAddingList}) => {
    // hooks
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    // actions
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const createList = async () => {
        toggleAddingList();

        dispatch({
            type: actionTypes.ADD_LIST,
            payload: { listId: shortid.generate(), listTitle: title }
        });
    }

    // ui
    return (
        <div className="add-list-editor">
            <ListEditor
                title={title}
                handleChangeTitle={handleChangeTitle}
                onClickOutside={toggleAddingList}
                saveList={createList}
            />

            <EditButtons
                handleSave={createList}
                saveLabel={"Add list"}
                handleCancel={toggleAddingList}
            />
        </div>
    )
}

export default AddList;

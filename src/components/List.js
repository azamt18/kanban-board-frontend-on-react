import "../styles/List.css";

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import shortid from "shortid";

const List = ({listId, index}) => {
    // hooks
    // dispatcher
    const dispatch = useDispatch()

    // selectors
    const list = useSelector((state) => state.listsById[listId])

    // states
    const [editingTitle, setEditingTitle] = useState(false)
    const [title, setTitle] = useState(list.title)
    const [addingCard, setAddingCard] = useState(false)

    // actions
    const toggleAddingCard = () => {
        setAddingCard(!addingCard)
    }

    const addCard = async cardText => {
        toggleAddingCard()

        const cardId = shortid.generate();

        dispatch({
            type: "ADD_CARD",
            payload: { cardText, cardId, listId }
        });
    }

    const toggleEditingTitle = () => {
        setEditingTitle(!editingTitle)
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const editListTitle = async () => {
        toggleEditingTitle()

        dispatch({
            type: "CHANGE_LIST_TITLE",
            payload: { listId, listTitle: title }
        });
    }

    const deleteList = async () => {
        if (window.confirm("Are you sure to delete this list?")) {
            dispatch({
                type: "DELETE_LIST",
                payload: {listId, cards: list.cards}
            });
        }
    };

    // ui
    return (
        <Draggable draggableId={list._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="list"
                >
                    {editingTitle ? (
                        <ListEditor
                            list={list}
                            title={title}
                            handleChangeTitle={handleChangeTitle}
                            saveList={editListTitle}
                            onClickOutside={editListTitle}
                            deleteList={deleteList}
                        />
                    ) : (
                        <div className="list-title" onClick={toggleEditingTitle}>
                            {list.title}
                        </div>
                    )}

                    <Droppable droppableId={list._id}>
                        {(provided, _snapshot) => (
                            <div ref={provided.innerRef} className="lists-cards">
                                {list.cards &&
                                    list.cards.map((cardId, index) => (
                                        <Card
                                            key={cardId}
                                            cardId={cardId}
                                            index={index}
                                            listId={list._id}
                                        />
                                    ))}

                                {provided.placeholder}

                                {addingCard ? (
                                    <CardEditor
                                        onSave={addCard}
                                        onCancel={toggleAddingCard}
                                        adding
                                    />
                                ) : (
                                    <div className="toggle-add-card" onClick={toggleAddingCard}>
                                        <ion-icon name="add" /> Add a card
                                    </div>
                                )}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

// export default connect(mapStateToProps)(List); // connect can reduce performance, instead we can use useSelect
export default List;

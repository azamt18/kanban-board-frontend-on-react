import "../styles/Board.css";

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import List from "./List";
import AddList from "./AddList";

const Board = ({
    // here can be props
    }) => {
    /// logic part

    // dispatcher - to call store action
    const dispatch = useDispatch()

    // selectors
    const board = useSelector((state) => state.board)

    // state
    const [
        addingList, // get state
        setAddingList // set state(action)
    ] = useState(false)



    const toggleAddingList = () => setAddingList(!addingList);

    const handleDragEnd = ({source, destination, type}) => {
        // dropped outside the allowed zones
        if (!destination) return;

        // move list
        if (type === "COLUMN") {
            // Prevent update if nothing has changed
            if (source.index !== destination.index) {
                dispatch({
                    type: "MOVE_LIST",
                    payload: {
                        oldListIndex: source.index,
                        newListIndex: destination.index
                    }
                });
            }
            return;
        }

        // move card
        if (
            source.index !== destination.index ||
            source.droppableId !== destination.droppableId
        ) {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                    sourceListId: source.droppableId,
                    destListId: destination.droppableId,
                    oldCardIndex: source.index,
                    newCardIndex: destination.index
                }
            });
        }

    }

    // UI part
    return (
        // return jsx: [html in js / js in html]
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                {(provided, _snapshot) => (
                    <div className="board" ref={provided.innerRef}>
                        {board.lists.map((listId, index) => {
                            return <List listId={listId} key={listId} index={index}/>;
                        })}

                        {provided.placeholder}

                        <div className="add-list">
                            {addingList ? (
                                <AddList toggleAddingList={toggleAddingList}/>
                            ) : (
                                <div
                                    onClick={toggleAddingList}
                                    className="add-list-button"
                                >
                                    <ion-icon name="add"/>
                                    Add a list
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

// const mapStateToProps = state => ({board: state.board}); // unused

// export default connect(mapStateToProps)(Board); // connect can reduce performance, instead we can use useSelect
export default Board;

import "../styles/Card.css";

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import CardEditor from "./CardEditor";

const Card = ({listId, cardId, index}) => {
    // dispatch
    const dispatch = useDispatch()

    // selectors
    const card = useSelector((state) => state.cardsById[cardId])

    // states
    const [hover, setHover] = useState(false)
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(card.text)

    // actions
    const startHover = () => setHover(true);
    const endHover = () => setHover(false);

    const startEditing = () => {
        setHover(false)
        setEditing(true)
        setText(card.text)
    }

    const endEditing = () => {
        setHover(false)
        setEditing(false)
    }

    const editCard = async text => {
        endEditing();
        dispatch({
            type: "CHANGE_CARD_TEXT",
            payload: { cardId: card._id, cardText: text }
        });
    };

    const deleteCard = async () => {
        if (window.confirm("Are you sure to delete this card?")) {
            dispatch({
                type: "DELETE_CARD",
                payload: { cardId: card._id, listId }
            });
        }
    };

    // ui
    if (!editing) {
        return (
            <Draggable draggableId={card._id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card"
                        onMouseEnter={startHover}
                        onMouseLeave={endHover}
                    >
                        {hover && (
                            <div className="card-icons">
                                <div className="card-icon" onClick={startEditing}>
                                    <ion-icon name="create" />
                                </div>
                            </div>
                        )}

                        {card.text}
                    </div>
                )}
            </Draggable>
        );
    } else {
        return (
            <CardEditor
                text={text}
                onSave={editCard}
                onDelete={deleteCard}
                onCancel={endEditing}
            />
        );
    }

}

// const mapStateToProps = (state, ownProps) => ({
//     card: state.cardsById[ownProps.cardId]
// });

export default Card;
// export default connect(mapStateToProps)(Card);

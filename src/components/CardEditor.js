import "../styles/CardEditor.css";

import React, {useState} from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = ({text, onSave, onCancel, onDelete, adding}) => {
    // states
    const [cardText, setCardText] = useState(text || "")

    // actions
    const handleChangeText = event => setCardText(event.target.value)

    const onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.onSave(cardText);
        }
    };

    // ui
    return (
        <div className="edit-card">
            <div className="card">
                <TextareaAutosize
                    autoFocus
                    className="edit-card-textarea"
                    placeholder="Enter the text for this card..."
                    value={text}
                    onChange={handleChangeText}
                    onKeyDown={onEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? "Add card" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
}

export default CardEditor;

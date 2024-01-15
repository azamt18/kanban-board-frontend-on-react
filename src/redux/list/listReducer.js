import * as actionTypes from "../actionTypes";

export default function listReducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.ADD_LIST: {
            const { listId, listTitle } = action.payload;
            return {
                ...state,
                [listId]: { _id: listId, title: listTitle, cards: [] }
            };
        }
        case actionTypes.CHANGE_LIST_TITLE: {
            const { listId, listTitle } = action.payload;
            return {
                ...state,
                [listId]: { ...state[listId], title: listTitle }
            };
        }
        case actionTypes.DELETE_LIST: {
            const { listId } = action.payload;
            const { [listId]: deletedList, ...restOfLists } = state;
            return restOfLists;
        }
        case actionTypes.ADD_CARD: {
            const { listId, cardId } = action.payload;
            return {
                ...state,
                [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
            };
        }
        case actionTypes.MOVE_CARD: {
            const {
                oldCardIndex,
                newCardIndex,
                sourceListId,
                destListId
            } = action.payload;
            // Move within the same list
            if (sourceListId === destListId) {
                const newCards = Array.from(state[sourceListId].cards);
                const [removedCard] = newCards.splice(oldCardIndex, 1);
                newCards.splice(newCardIndex, 0, removedCard);
                return {
                    ...state,
                    [sourceListId]: { ...state[sourceListId], cards: newCards }
                };
            }
            // Move card from one list to another
            const sourceCards = Array.from(state[sourceListId].cards);
            const [removedCard] = sourceCards.splice(oldCardIndex, 1);
            const destinationCards = Array.from(state[destListId].cards);
            destinationCards.splice(newCardIndex, 0, removedCard);
            return {
                ...state,
                [sourceListId]: { ...state[sourceListId], cards: sourceCards },
                [destListId]: { ...state[destListId], cards: destinationCards }
            };
        }
        case actionTypes.DELETE_CARD: {
            const { cardId: deletedCardId, listId } = action.payload;
            const filterDeleted = cardId => cardId !== deletedCardId;
            return {
                ...state,
                [listId]: {
                    ...state[listId],
                    cards: state[listId].cards.filter(filterDeleted)
                }
            };
        }
        default:
            return state;
    }
};

// export default listReducer;

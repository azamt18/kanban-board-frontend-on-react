import { combineReducers, createStore } from "redux";
import throttle from "lodash.throttle";
import seed from "../seeder/seed";
import boardReducer from "./board/boardReducer";
import cardReducer from "./card/cardReducer";
import listReducer from "./list/listReducer";

// const board = (state = { lists: [] }, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_LIST: {
//             const { listId } = action.payload;
//             return { lists: [...state.lists, listId] };
//         }
//         case actionTypes.MOVE_LIST: {
//             const { oldListIndex, newListIndex } = action.payload;
//             const newLists = Array.from(state.lists);
//             const [removedList] = newLists.splice(oldListIndex, 1);
//             newLists.splice(newListIndex, 0, removedList);
//             return { lists: newLists };
//         }
//         case actionTypes.DELETE_LIST: {
//             const { listId } = action.payload;
//             const filterDeleted = tmpListId => tmpListId !== listId;
//             const newLists = state.lists.filter(filterDeleted);
//             return { lists: newLists };
//         }
//         default:
//             return state;
//     }
// };

// const listsById = (state = {}, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_LIST: {
//             const { listId, listTitle } = action.payload;
//             return {
//                 ...state,
//                 [listId]: { _id: listId, title: listTitle, cards: [] }
//             };
//         }
//         case actionTypes.CHANGE_LIST_TITLE: {
//             const { listId, listTitle } = action.payload;
//             return {
//                 ...state,
//                 [listId]: { ...state[listId], title: listTitle }
//             };
//         }
//         case actionTypes.DELETE_LIST: {
//             const { listId } = action.payload;
//             const { [listId]: deletedList, ...restOfLists } = state;
//             return restOfLists;
//         }
//         case actionTypes.ADD_CARD: {
//             const { listId, cardId } = action.payload;
//             return {
//                 ...state,
//                 [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] }
//             };
//         }
//         case actionTypes.MOVE_CARD: {
//             const {
//                 oldCardIndex,
//                 newCardIndex,
//                 sourceListId,
//                 destListId
//             } = action.payload;
//             // Move within the same list
//             if (sourceListId === destListId) {
//                 const newCards = Array.from(state[sourceListId].cards);
//                 const [removedCard] = newCards.splice(oldCardIndex, 1);
//                 newCards.splice(newCardIndex, 0, removedCard);
//                 return {
//                     ...state,
//                     [sourceListId]: { ...state[sourceListId], cards: newCards }
//                 };
//             }
//             // Move card from one list to another
//             const sourceCards = Array.from(state[sourceListId].cards);
//             const [removedCard] = sourceCards.splice(oldCardIndex, 1);
//             const destinationCards = Array.from(state[destListId].cards);
//             destinationCards.splice(newCardIndex, 0, removedCard);
//             return {
//                 ...state,
//                 [sourceListId]: { ...state[sourceListId], cards: sourceCards },
//                 [destListId]: { ...state[destListId], cards: destinationCards }
//             };
//         }
//         case actionTypes.DELETE_CARD: {
//             const { cardId: deletedCardId, listId } = action.payload;
//             const filterDeleted = cardId => cardId !== deletedCardId;
//             return {
//                 ...state,
//                 [listId]: {
//                     ...state[listId],
//                     cards: state[listId].cards.filter(filterDeleted)
//                 }
//             };
//         }
//         default:
//             return state;
//     }
// };

// const cardsById = (state = {}, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_CARD: {
//             const { cardText, cardId } = action.payload;
//             return { ...state, [cardId]: { text: cardText, _id: cardId } };
//         }
//         case actionTypes.CHANGE_CARD_TEXT: {
//             const { cardText, cardId } = action.payload;
//             return { ...state, [cardId]: { ...state[cardId], text: cardText } };
//         }
//         case actionTypes.DELETE_CARD: {
//             const { cardId } = action.payload;
//             const { [cardId]: deletedCard, ...restOfCards } = state;
//             return restOfCards;
//         }
//         // Find every card from the deleted list and remove it
//         case actionTypes.DELETE_LIST: {
//             const { cards: cardIds } = action.payload;
//             return Object.keys(state)
//                 .filter(cardId => !cardIds.includes(cardId))
//                 .reduce(
//                     (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
//                     {}
//                 );
//         }
//         default:
//             return state;
//     }
// };

const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch {
        // ignore write errors
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const store = createStore(combineReducers({
    boardReducer,
    listReducer,
    cardReducer
}), loadState());

store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

console.log(store.getState());
if (!store.getState().boardReducer.lists.length) {
    console.log("SEED");
    seed(store);
}

export default store;

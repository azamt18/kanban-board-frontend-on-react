import * as actionTypes from "../actionTypes";

export default function boardReducer(state = { lists: [] }, action) {
    switch (action.type) {
        case actionTypes.ADD_LIST: {
            const { listId } = action.payload;
            return { lists: [...state.lists, listId] };
        }
        case actionTypes.MOVE_LIST: {
            const { oldListIndex, newListIndex } = action.payload;
            const newLists = Array.from(state.lists);
            const [removedList] = newLists.splice(oldListIndex, 1);
            newLists.splice(newListIndex, 0, removedList);
            return { lists: newLists };
        }
        case actionTypes.DELETE_LIST: {
            const { listId } = action.payload;
            const filterDeleted = tmpListId => tmpListId !== listId;
            const newLists = state.lists.filter(filterDeleted);
            return { lists: newLists };
        }
        default:
            return state;
    }
};

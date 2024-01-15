import shortid from "shortid";

// eslint-disable-next-line import/no-anonymous-default-export
export default store => {
    /*
    * 1st list
    */
    {
        console.log("Insert first list");
        const firstListId = shortid.generate();

        store.dispatch({
            type: "ADD_LIST",
            payload: { listId: firstListId, listTitle: "Todo" }
        });

        store.dispatch({
            type: "ADD_CARD",
            payload: {
                listId: firstListId,
                cardId: shortid.generate(),
                cardText: "Deploy on Kubernetes"
            }
        });

        store.dispatch({
            type: "ADD_CARD",
            payload: {
                listId: firstListId,
                cardId: shortid.generate(),
                cardText: "Optimize test cases"
            }
        });
    }

    /*
    * 2nd list
    */
    {
        console.log("Insert second list");
        const secondListId = shortid.generate();

        store.dispatch({
            type: "ADD_LIST",
            payload: { listId: secondListId, listTitle: "Active" }
        });

        store.dispatch({
            type: "ADD_CARD",
            payload: {
                listId: secondListId,
                cardId: shortid.generate(),
                cardText: "Improve UI/UX"
            }
        });
    }

    /*
    * 3rd list
    * */
    {
        console.log("Insert third list");
        const secondListId = shortid.generate();

        store.dispatch({
            type: "ADD_LIST",
            payload: { listId: secondListId, listTitle: "Complete" }
        });

        store.dispatch({
            type: "ADD_CARD",
            payload: {
                listId: secondListId,
                cardId: shortid.generate(),
                cardText: "Complete backend part"
            }
        });

        store.dispatch({
            type: "ADD_CARD",
            payload: {
                listId: secondListId,
                cardId: shortid.generate(),
                cardText: "Seed data for backend"
            }
        });
    }

};

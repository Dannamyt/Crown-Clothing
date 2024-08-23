import { CATEGORIES_ACTION_TYPES } from "./category-types"

export const CATEGORIES_INITIAL_STATE ={
    categoriesMap:{}
}

export const categoriesReducer =(state = CATEGORIES_INITIAL_STATE,action)=>{
    const {type,payload} = action
    console.log(action)
   
    if (type === CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP) {
        console.log('Handling user action');
      } else {
        console.log('Received unexpected action type in CATEGORYReducer');
      }

    switch(type){
        case CATEGORIES_ACTION_TYPES?.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap:payload}
        default:
            return state
    }
}
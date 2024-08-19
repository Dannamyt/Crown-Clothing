import { createAction } from "../../utils/reducer/reducer.util";


export const setCurrentUser = (user)=>{
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)

}
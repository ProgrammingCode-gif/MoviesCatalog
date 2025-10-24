import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        initUser(_, action) {
            return action.payload
        },
        exitUser() {
            return null
        }
    }
})

export const {initUser, exitUser} = userSlice.actions
export default userSlice.reducer
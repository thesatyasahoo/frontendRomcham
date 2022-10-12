import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./adminSlice";
import AccountHolderSlice from "./accountHolderSlice";
import RunroomSlice from "./runRoom";

const store = configureStore({
    reducer: {
        Admin: AdminSlice.reducer,
        Profile: AccountHolderSlice.reducer,
        Runroom: RunroomSlice.reducer,
    }
})

export default store;
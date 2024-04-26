import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type configStoreT = {
    BuildFocus: "General",
    Language: "English"
}
const initialState:configStoreT = {
    BuildFocus: "General",
    Language: "English"
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        overwriteConfig: (state, action: PayloadAction<configStoreT>) => {
            return action.payload;
        },
    }
});

export const selectConfig = (state: RootState) => {return state.config};
export const { overwriteConfig } = configSlice.actions;

export default configSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type ToastPayloadT = {
    active: boolean,
    color: string,
    message: string
}

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        active: false,
        color: '#ccc',
        message: ''
    },
    reducers: {
        setToast: (state, action: PayloadAction<ToastPayloadT>) => {
            const { active, color, message} = action.payload;
            state.active = active;
            state.color = color;
            state.message = message
        },
    }
});

export const selectToast = (state: RootState) => {return state.toast }
export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
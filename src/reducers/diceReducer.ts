import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface Dices {
    numberOfDices: number,
    values: Object[];
}

const initialState: Array<Dices> = [
    {
        numberOfDices: 0,
        values: []
    }
]

export const dicesSlice = createSlice({
    name: "dices",
    initialState,
    reducers: {
      removeValue: (state, action: PayloadAction<Dices>) => {
        state.push(action.payload);
      },
    },
  });


export const { removeValue } = dicesSlice.actions;
export const userSelector = (state: RootState) => state.dicesReducer;
export default dicesSlice.reducer;

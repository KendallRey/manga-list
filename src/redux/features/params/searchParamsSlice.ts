import API from "@/app/api/API";
import { REDUX } from "@/redux/constant/slice";
import { clearAction, setAction } from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type ISearchParamsSlice = {
  [API.PARAMS.KEYS.PREVIEW]?: string;
  [API.PARAMS.KEYS.ACTION]?: string;
};

const INITIAL_STATE: ISearchParamsSlice = {};

const searchParamsSlice = createSlice({
  name: REDUX.SLICE.SAMPLE,
  initialState: INITIAL_STATE,
  reducers: {
    setSearchParamsPreview: setAction<ISearchParamsSlice, string>(API.PARAMS.KEYS.PREVIEW),
    clearSearchParamsPreview: clearAction(API.PARAMS.KEYS.PREVIEW, INITIAL_STATE),
  },
});

export const { setSearchParamsPreview, clearSearchParamsPreview } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;

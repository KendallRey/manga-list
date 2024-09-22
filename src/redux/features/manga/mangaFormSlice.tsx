import { REDUX } from "@/redux/constant/slice";
import {
  clearFormErrorAction,
  editFormAction,
  editFormErrorAction,
  setFormAction,
  setFormErrorAction,
} from "@/redux/helper/action";
import { IMangaTableInsert } from "@/utils/drizzle/schema";
import { createSlice } from "@reduxjs/toolkit";

type IMangaFormSliceState = IReduxFormState<IMangaTableInsert>;

const INITIAL_STATE: IMangaFormSliceState = {};

const mangaFormSlice = createSlice({
  name: REDUX.SLICE.MANGA_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setMangaForm: setFormAction<IMangaFormSliceState>,
    editMangaForm: editFormAction<IMangaFormSliceState>,
    setMangaFormError: setFormErrorAction<IMangaFormSliceState>,
    editMangaFormError: editFormErrorAction<IMangaFormSliceState>,
    clearMangaFormError: clearFormErrorAction<IMangaFormSliceState>,
    clearMangaForm: () => INITIAL_STATE,
  },
});

export const {
  setMangaForm,
  editMangaForm,
  setMangaFormError,
  editMangaFormError,
  clearMangaFormError,
  clearMangaForm,
} = mangaFormSlice.actions;

export default mangaFormSlice.reducer;

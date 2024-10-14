import { REDUX } from "@/redux/constant/slice";
import {
  clearFormErrorAction,
  editFormAction,
  editFormErrorAction,
  setFormAction,
  setFormErrorAction,
} from "@/redux/helper/action";
import { IUserProfileTableInsert } from "@/utils/drizzle/schema";
import { createSlice } from "@reduxjs/toolkit";

type IUserProfileFormSliceState = IReduxFormState<IUserProfileTableInsert>;

const INITIAL_STATE: IUserProfileFormSliceState = {};

const userProfileFormSlice = createSlice({
  name: REDUX.SLICE.MANGA_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setUserProfileForm: setFormAction<IUserProfileFormSliceState>,
    editUserProfileForm: editFormAction<IUserProfileFormSliceState>,
    setUserProfileFormError: setFormErrorAction<IUserProfileFormSliceState>,
    editUserProfileFormError: editFormErrorAction<IUserProfileFormSliceState>,
    clearUserProfileFormError: clearFormErrorAction<IUserProfileFormSliceState>,
    clearUserProfileForm: () => INITIAL_STATE,
  },
});

export const {
  setUserProfileForm,
  editUserProfileForm,
  setUserProfileFormError,
  editUserProfileFormError,
  clearUserProfileFormError,
  clearUserProfileForm,
} = userProfileFormSlice.actions;

export default userProfileFormSlice.reducer;

import { ILoginFormSchema } from "@/model/login/login";
import { REDUX } from "@/redux/constant/slice";
import {
  clearFormErrorAction,
  editFormAction,
  editFormErrorAction,
  setFormAction,
  setFormErrorAction,
} from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type ILoginFormSliceState = IReduxFormState<ILoginFormSchema>;

const INITIAL_STATE: ILoginFormSliceState = {};

const loginFormSlice = createSlice({
  name: REDUX.SLICE.MANGA_FORM,
  initialState: INITIAL_STATE,
  reducers: {
    setLoginForm: setFormAction<ILoginFormSliceState>,
    editLoginForm: editFormAction<ILoginFormSliceState>,
    setLoginFormError: setFormErrorAction<ILoginFormSliceState>,
    editLoginFormError: editFormErrorAction<ILoginFormSliceState>,
    clearLoginFormError: clearFormErrorAction<ILoginFormSliceState>,
    clearLoginForm: () => INITIAL_STATE,
  },
});

export const {
  setLoginForm,
  editLoginForm,
  setLoginFormError,
  editLoginFormError,
  clearLoginFormError,
  clearLoginForm,
} = loginFormSlice.actions;

export default loginFormSlice.reducer;

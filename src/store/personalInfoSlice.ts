// src/store/personalInfoSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface PersonalInfoState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const initialState: PersonalInfoState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;

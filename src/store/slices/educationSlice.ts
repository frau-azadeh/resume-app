import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface EducationFormData {
  degree: string;
  field?: string;
  specialization?: string;
  institutionType?: string;
  institutionName?: string;
  grade?: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD or undefined
  isStudying: boolean;
  description?: string;
}

interface EducationState {
  educationList: EducationFormData[];
  educationForm: Partial<EducationFormData> | null;
}

const initialState: EducationState = {
  educationList: [],
  educationForm: null,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setEducationList(state, action: PayloadAction<EducationFormData[]>) {
      state.educationList = action.payload;
    },
    setEducationForm(
      state,
      action: PayloadAction<Partial<EducationFormData> | null>,
    ) {
      state.educationForm = action.payload;
    },
    clearEducationData(state) {
      state.educationList = [];
      state.educationForm = null;
    },
  },
});

export const { setEducationList, setEducationForm, clearEducationData } =
  educationSlice.actions;
export default educationSlice.reducer;

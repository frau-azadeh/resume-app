import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface workFormData {
  companyName: string;
  position: string;
  field: string;
  level: string;
  cooperationType: string;
  insuranceMonths: string;
  startDate: string;
  endDate: string;
  isWorking: boolean;
  workPhone: string;
  lastSalary: string;
  terminationReason: string;
  description: string;
}

interface workState {
  workList: workFormData[];
  workForm: Partial<workFormData> | null;
}

const initialState: workState = {
  workList: [],
  workForm: null,
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setworkList(state, action: PayloadAction<workFormData[]>) {
      state.workList = action.payload;
    },
    setworkForm(state, action: PayloadAction<Partial<workFormData>>) {
      state.workForm = action.payload;
    },
    clearworkData(state) {
      state.workList = [];
      state.workForm = null;
    },
  },
});

export const { setworkList, setworkForm, clearworkData } = workSlice.actions;
export default workSlice.reducer;

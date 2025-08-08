// store/slices/workSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ⬅️ تایپ مناسب ذخیره در Redux (فقط string و boolean)
export interface WorkFormData {
  company_name: string;
  position: string;
  field?: string;
  level?: string;
  cooperation_type?: string;
  insurance_months?: string;

  start_date: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  is_working: boolean;
  work_phone?: string;
  last_salary?: string;
  termination_reason?: string;
  description?: string;
  user_id?: string;
}

interface WorkState {
  workList: WorkFormData[];
  workForm: Partial<WorkFormData> | null;
}

const initialState: WorkState = {
  workList: [],
  workForm: null,
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setWorkList(state, action: PayloadAction<WorkFormData[]>) {
      state.workList = action.payload;
    },
    setWorkForm(state, action: PayloadAction<Partial<WorkFormData> | null>) {
      state.workForm = action.payload;
    },
    clearWorkData(state) {
      state.workList = [];
      state.workForm = null;
    },
  },
});

export const { setWorkList, setWorkForm, clearWorkData } = workSlice.actions;
export default workSlice.reducer;

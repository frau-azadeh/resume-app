// store/slices/workSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ⬅️ تایپ مناسب ذخیره در Redux (فقط string و boolean)
export interface WorkFormPersisted {
  company_name: string;
  position: string;
  field?: string;
  level?: string;
  cooperation_type?: string;
  insurance_months?: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  is_working: boolean;
  work_phone?: string;
  last_salary?: string;
  termination_reason?: string;
  description?: string;
}

interface WorkState {
  workList: WorkFormPersisted[];
  workForm: Partial<WorkFormPersisted>;
}

const initialState: WorkState = {
  workList: [],
  workForm: {},
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setworkList(state, action: PayloadAction<WorkFormPersisted[]>) {
      state.workList = action.payload;
    },
    setworkForm(state, action: PayloadAction<Partial<WorkFormPersisted>>) {
      state.workForm = action.payload;
    },
    clearWorkData(state) {
      state.workList = [];
      state.workForm = {};
    },
  },
});

export const { setworkList, setworkForm, clearWorkData } = workSlice.actions;
export default workSlice.reducer;

// store/personalInfoSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import type { PersonalInfoForm } from "../../types/types";

interface PersonalInfoState {
  personalInfo: PersonalInfoForm;
}

const initialState: PersonalInfoState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    nationalCode: "",
    birthDate: "",
    birthCity: "",
    birthProvince: "",
    idNumber: "",
    issueCity: "",
    issueProvince: "",
    religion: "",
    maritalStatus: "",
    gender: "",
    fatherName: "",
    fatherJob: "",
    fatherEducation: "",
    motherName: "",
    motherJob: "",
    motherEducation: "",
    siblingsCount: 0,
    childrenCount: 0,
    residenceProvince: "",
    residenceCity: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
  },
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoForm>) => {
      state.personalInfo = action.payload;
    },
  },
});

export const { setPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;

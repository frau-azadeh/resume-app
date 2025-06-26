import { createSlice } from "@reduxjs/toolkit";
import type{  PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfoState {
  personalInfo: {
    firstName: string;
    lastName: string;
    nationalCode: string;
    birthDate: string | null;  // ذخیره به صورت string
    birthCity: string;
    birthProvince: string;
    idNumber: string;
    issueCity: string;
    issueProvince: string;
    religion: string;
    maritalStatus: string;
    gender: string;
    fatherName: string;
    fatherJob: string;
    fatherEducation: string;
    motherName: string;
    motherJob: string;
    motherEducation: string;
    siblingsCount: number;
    childrenCount: number;
    residenceProvince: string;
    residenceCity: string;
    address: string;
    postalCode: string;
    phone: string;
    email: string;
    emergencyContactName: string;
    emergencyContactRelation: string;
    emergencyContactPhone: string;
    avatar: string;
  };
}

const initialState: PersonalInfoState = {
  personalInfo: {
    firstName: "",
    lastName: "",
    nationalCode: "",
    birthDate: null,
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
    avatar: "",
  }
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo(state, action: PayloadAction<PersonalInfoState["personalInfo"]>) {
      state.personalInfo = action.payload;
    },
    clearPersonalInfo(state) {
      state.personalInfo = initialState.personalInfo;
    },
  },
});

export const { setPersonalInfo, clearPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;

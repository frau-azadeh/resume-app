import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SkillItem {
  name: string;
  level: number;
}

export type Proficiency = "ضعیف" | "متوسط" | "عالی";

export interface LanguageSkill {
  language: string;
  reading: Proficiency;
  writing: Proficiency;
  speaking: Proficiency;
  comprehension: Proficiency;
}

export interface ManagementSkill {
  name: string;
  level: number;
}

export interface SkillState {
  skillList: SkillItem[];
  skillForm: Partial<SkillItem>;
  languageSkills: LanguageSkill[];
  managementSkills: ManagementSkill[];
  languageForm: Partial<LanguageSkill>;
  managementForm: Partial<ManagementSkill>;
  resumeFile: ResumeFile | null;
}

export interface ResumeFile {
  name: string;
  base64: string;
}

const initialState: SkillState = {
  skillList: [],
  skillForm: {},
  languageSkills: [],
  managementSkills: [],
  languageForm: {},
  managementForm: {},
  resumeFile: null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkillList: (state, action: PayloadAction<SkillItem[]>) => {
      state.skillList = action.payload;
    },
    setSkillForm: (state, action: PayloadAction<Partial<SkillItem>>) => {
      state.skillForm = action.payload;
    },
    setLanguageSkills: (state, action: PayloadAction<LanguageSkill[]>) => {
      state.languageSkills = action.payload;
    },
    setManagementSkills: (state, action: PayloadAction<ManagementSkill[]>) => {
      state.managementSkills = action.payload;
    },
    setLanguageForm: (state, action: PayloadAction<Partial<LanguageSkill>>) => {
      state.languageForm = action.payload;
    },
    setManagementForm: (
      state,
      action: PayloadAction<Partial<ManagementSkill>>
    ) => {
      state.managementForm = action.payload;
    },
    setResumeFile: (state, action: PayloadAction<ResumeFile | null>) => {
      state.resumeFile = action.payload;
    },
  },
});

export const {
  setSkillList,
  setSkillForm,
  setLanguageSkills,
  setManagementSkills,
  setLanguageForm,
  setManagementForm,
  setResumeFile,
} = skillSlice.actions;

export default skillSlice.reducer;

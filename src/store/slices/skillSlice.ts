import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Types
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

export interface ResumeFile {
  name: string;
  base64: string;
}

export interface SkillState {
  skillList: SkillItem[];
  languageSkills: LanguageSkill[];
  managementSkills: ManagementSkill[];
  resumeFile: ResumeFile | null;
}

const initialState: SkillState = {
  skillList: [],
  languageSkills: [],
  managementSkills: [],
  resumeFile: null,
};

// Slice
const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    // --- Skill Actions ---
    addSkill: (state, action: PayloadAction<SkillItem>) => {
      state.skillList.push(action.payload);
    },
    deleteSkill: (state, action: PayloadAction<number>) => {
      state.skillList.splice(action.payload, 1);
    },

    // --- Language Skill Actions ---
    addLanguageSkill: (state, action: PayloadAction<LanguageSkill>) => {
      state.languageSkills.push(action.payload);
    },
    deleteLanguageSkill: (state, action: PayloadAction<number>) => {
      state.languageSkills.splice(action.payload, 1);
    },

    // --- Management Skill Actions ---
    addManagementSkill: (state, action: PayloadAction<ManagementSkill>) => {
      state.managementSkills.push(action.payload);
    },
    deleteManagementSkill: (state, action: PayloadAction<number>) => {
      state.managementSkills.splice(action.payload, 1);
    },

    // --- Resume File ---
    setResumeFile: (state, action: PayloadAction<ResumeFile | null>) => {
      state.resumeFile = action.payload;
    },
  },
});

// Exports
export const {
  addSkill,
  deleteSkill,
  addLanguageSkill,
  deleteLanguageSkill,
  addManagementSkill,
  deleteManagementSkill,
  setResumeFile,
} = skillSlice.actions;

export default skillSlice.reducer;

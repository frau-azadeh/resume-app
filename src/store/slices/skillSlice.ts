// UPDATED skillSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SkillItem {
  name: string;
  level: number;
}

export type Proficiency = "ضعیف" | "متوسط" | "عالی";

interface LanguageSkill {
  language: string;
  reading: Proficiency;
  writing: Proficiency;
  speaking: Proficiency;
  comprehension: Proficiency;
}

interface ManagementSkill {
  name: string;
  level: number;
}

interface SkillState {
  skillList: SkillItem[];
  skillForm: Partial<SkillItem>;
  languageSkills: LanguageSkill[];
  managementSkills: ManagementSkill[];
}

const initialState: SkillState = {
  skillList: [],
  skillForm: {},
  languageSkills: [],
  managementSkills: [],
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
  },
});

export const { setSkillList, setSkillForm, setLanguageSkills, setManagementSkills } = skillSlice.actions;
export default skillSlice.reducer;
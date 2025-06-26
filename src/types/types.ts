import type { Dayjs } from "dayjs";

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  nationalCode: string;
  birthDate: Dayjs | null; // فرم از نوع Dayjs
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
}

export type Proficiency = "ضعیف" | "متوسط" | "عالی";

export interface SkillItem {
  name: string;
  level: number;
}

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

export interface EducationFormDataLocal {
  degree: string;
  field: string;
  specialization: string;
  institutionType: string;
  institutionName: string;
  grade: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  isStudying: boolean;
  description: string;
}

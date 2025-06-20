// types.ts

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  nationalCode: string;
  birthDate: string;
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
  avatar?: string; // ✅ اضافه کردن آواتار (base64 string)
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

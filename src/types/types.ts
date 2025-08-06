import DateObject from "react-date-object";

export interface PersonalInfoForm {
  first_name: string;
  last_name: string;
  national_code: string;
  birth_date?: DateObject | undefined;
  birth_province: string;
  birth_city: string;
  id_number: string;
  issue_city: string;
  issue_province: string;
  religion: string;
  marital_status: string;
  gender: string;
  father_name: string;
  father_job: string;
  father_education: string;
  mother_name: string;
  mother_job: string;
  mother_education: string;
  siblings_count: number;
  children_count: number;
  residence_province: string;
  residence_city: string;
  address: string;
  postal_code: string;
  phone: string;
  email: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
  avatar_url: string;
}

export type Proficiency = "ضعیف" | "متوسط" | "عالی" | null;

// types/index.ts
export interface SkillFormData {
  skill_name: string;
  skill_level: "beginner" | "intermediate" | "advanced";
}

export interface LanguageSkill {
  language: string;
  reading: Proficiency;
  writing: Proficiency;
  speaking: Proficiency;
  comprehension: Proficiency;
}

export interface ManagementSkill {
  manage_name: string;
  manage_level: number;
}

export interface EducationFormDataLocal {
  degree: string;
  field: string;
  specialization: string;
  institution_type: string;
  institution_name: string;
  grade: string;
  start_date: DateObject;
  end_date: DateObject | null;
  is_studying: boolean;
  description: string;
}

export interface WorkFormDataType {
  company_name: string;
  position: string;
  field?: string;
  level?: string;
  cooperation_type?: string;
  insurance_months?: number | string;

  start_date: DateObject;
  end_date: DateObject | null;
  is_working: boolean;
  work_phone?: string;
  last_salary?: string;
  termination_reason?: string;
  description?: string;
}

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { setPersonalInfo } from "../store/slices/personalInfoSlice";
import { setActiveTab } from "../store/slices/tabSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import type { PersonalInfoForm } from "../types/types";

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // اطلاعات ذخیره‌شده در Redux
  const savedInfo = useSelector(
    (state: RootState) => state.personalInfo.personalInfo
  );

  // مقداردهی اولیه فرم
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoForm>({
    defaultValues: savedInfo, // ← این خط مهم است
  });

  // اطمینان از اینکه هنگام لود اولیه مقادیر در فرم نمایش داده شوند
  React.useEffect(() => {
    reset(savedInfo);
  }, [reset, savedInfo]);

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(setPersonalInfo(data));
    toast.success("اطلاعات با موفقیت ثبت شد!");
    dispatch(setActiveTab("education"));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-4">اطلاعات فردی</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* اطلاعات فردی */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">اطلاعات فردی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="نام" {...register("firstName", { required: "نام الزامی است" })} error={errors.firstName} />
            <Input label="نام خانوادگی" {...register("lastName", { required: "نام خانوادگی الزامی است" })} error={errors.lastName} />
            <Input label="کدملی" {...register("nationalCode", { required: "کدملی الزامی است" })} error={errors.nationalCode} />
            <Input label="تاریخ تولد" {...register("birthDate", { required: "تاریخ تولد الزامی است" })} error={errors.birthDate} />
            <Input label="استان محل تولد" {...register("birthProvince")} />
            <Input label="شهر محل تولد" {...register("birthCity")} />
            <Input label="شماره شناسنامه" {...register("idNumber")} />
            <Input label="استان محل صدور" {...register("issueProvince")} />
            <Input label="شهر محل صدور" {...register("issueCity")} />
            <Input label="دین" {...register("religion")} />
            <Input label="وضعیت تاهل" {...register("maritalStatus")} />
            <Input label="جنسیت" {...register("gender")} />
          </div>
        </div>

        {/* اطلاعات خانواده */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">اطلاعات خانواده</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="نام پدر" {...register("fatherName")} />
            <Input label="شغل پدر" {...register("fatherJob")} />
            <Input label="تحصیلات پدر" {...register("fatherEducation")} />
            <Input label="نام مادر" {...register("motherName")} />
            <Input label="شغل مادر" {...register("motherJob")} />
            <Input label="تحصیلات مادر" {...register("motherEducation")} />
            <Input label="تعداد برادر و خواهر" type="number" {...register("siblingsCount")} />
            <Input label="تعداد فرزندان" type="number" {...register("childrenCount")} />
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">اطلاعات تماس</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="استان محل سکونت" {...register("residenceProvince")} />
            <Input label="شهر محل سکونت" {...register("residenceCity")} />
            <Input label="آدرس" {...register("address")} />
            <Input label="کد پستی" {...register("postalCode")} />
            <Input label="تلفن ثابت با کد شهر" {...register("phone")} />
            <Input label="ایمیل" type="email" {...register("email")} />
            <Input label="نام فرد رابط جهت تماس اضطراری" {...register("emergencyContactName")} />
            <Input label="نسبت" {...register("emergencyContactRelation")} />
            <Input label="تلفن ضروری" {...register("emergencyContactPhone")} />
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-between mt-6">
          <Button type="button" variant="secondary" disabled className="cursor-not-allowed opacity-50">
            مرحله قبل
          </Button>
          <div className="flex gap-2">
            <Button type="button" className="bg-red-500 hover:bg-red-600">
              انصراف
            </Button>
            <Button type="submit">ثبت و مرحله بعد</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

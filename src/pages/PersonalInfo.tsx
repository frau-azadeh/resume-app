import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { setPersonalInfo } from "../store/slices/personalInfoSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import type { PersonalInfoForm } from "../types/types";
import { useNavigate } from "react-router-dom";

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const savedInfo = useSelector(
    (state: RootState) => state.personalInfo.personalInfo,
  );

  // local state برای آواتار (برای نمایش سریع)
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(
    savedInfo.avatar || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PersonalInfoForm>({
    defaultValues: savedInfo,
  });

  React.useEffect(() => {
    reset(savedInfo);
    setAvatarPreview(savedInfo.avatar || null);
  }, [reset, savedInfo]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // قبول همه نوع عکس بجز فایل‌های غیر تصویر
    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل تصویر مجاز است.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatarPreview(base64String); // برای نمایش فوری عکس
      // ذخیره در redux با داده‌های فرم فعلی
      dispatch(setPersonalInfo({ ...getValues(), avatar: base64String }));
      toast.success("عکس با موفقیت بارگذاری شد");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(setPersonalInfo(data));
    toast.success("اطلاعات با موفقیت ثبت شد!");
    navigate("/form/education");
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold text-center mb-4">اطلاعات فردی</h1>

      {/* ✅ آپلود عکس */}
      <div className="flex flex-col items-center mb-6">
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="آواتار"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            بدون عکس
          </div>
        )}
        <input
          type="file"
          accept="image/*" // همه عکس ها رو قبول کن
          onChange={handleAvatarUpload}
          className="mt-2"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* اطلاعات فردی */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">اطلاعات فردی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="نام"
              {...register("firstName", { required: "نام الزامی است" })}
              error={errors.firstName}
            />
            <Input
              label="نام خانوادگی"
              {...register("lastName", { required: "نام خانوادگی الزامی است" })}
              error={errors.lastName}
            />
            <Input
              label="کدملی"
              {...register("nationalCode", { required: "کدملی الزامی است" })}
              error={errors.nationalCode}
            />
            <Input
              label="تاریخ تولد"
              {...register("birthDate", { required: "تاریخ تولد الزامی است" })}
              error={errors.birthDate}
            />
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
            <Input
              label="تعداد برادر و خواهر"
              type="number"
              {...register("siblingsCount")}
            />
            <Input
              label="تعداد فرزندان"
              type="number"
              {...register("childrenCount")}
            />
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
            <Input
              label="نام فرد رابط جهت تماس اضطراری"
              {...register("emergencyContactName")}
            />
            <Input label="نسبت" {...register("emergencyContactRelation")} />
            <Input label="تلفن ضروری" {...register("emergencyContactPhone")} />
          </div>
        </div>

        <div className="flex justify-end mt-6">
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

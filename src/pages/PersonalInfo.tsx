import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import JalaliDateInput from "../components/ui/JalaliDatePicker";
import { todayJalali } from "../utils/date";
import dayjs, { Dayjs } from "dayjs";
import type { AppDispatch, RootState } from "../store/store";
import { setPersonalInfo } from "../store/slices/personalInfoSlice";
import type { PersonalInfoForm } from "../types/types";

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const savedInfo = useSelector((state: RootState) => state.personalInfo.personalInfo);

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(savedInfo.avatar || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<PersonalInfoForm>({
    defaultValues: {
      ...savedInfo,
      birthDate: savedInfo.birthDate ? dayjs(savedInfo.birthDate) : todayJalali(),
    },
  });

  React.useEffect(() => {
    reset({
      ...savedInfo,
      birthDate: savedInfo.birthDate ? dayjs(savedInfo.birthDate) : todayJalali(),
    });
    setAvatarPreview(savedInfo.avatar || null);
  }, [savedInfo, reset]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل تصویر مجاز است.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatarPreview(base64String);
      dispatch(setPersonalInfo({
        ...getValues(),
        avatar: base64String,
        birthDate: getValues().birthDate?.format("YYYY-MM-DD") || null
      }));
      toast.success("عکس با موفقیت بارگذاری شد");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(setPersonalInfo({
      ...data,
      birthDate: data.birthDate ? data.birthDate.format("YYYY-MM-DD") : null,
      avatar: avatarPreview || "",
    }));
    toast.success("اطلاعات با موفقیت ثبت شد!");
    navigate("/form/education");
  };

 
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-4">اطلاعات فردی</h1>

      <div className="flex flex-col items-center mb-6">
        {avatarPreview ? (
          <img src={avatarPreview} alt="آواتار" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            بدون عکس
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="mt-2"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              label="کد ملی"
              {...register("nationalCode", {
                required: "کد ملی الزامی است",
                pattern: {
                  value: /^\d+$/,
                  message: "کد ملی باید فقط شامل عدد باشد",
                },
              })}
              error={errors.nationalCode}
            />
            <div className="flex flex-col">
              <JalaliDateInput
                label="تاریخ تولد"
                value={watch("birthDate")}
                onChange={(date: Dayjs | null) => {
                  setValue("birthDate", date, { shouldValidate: true });
                }}
              />
              {errors.birthDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.birthDate.message}
                </span>
              )}
            </div>
            <Input label="استان محل تولد" {...register("birthProvince")} />
            <Input label="شهر محل تولد" {...register("birthCity")} />
            <Input label="شماره شناسنامه" {...register("idNumber")} />
            <Input label="استان محل صدور" {...register("issueProvince")} />
            <Input label="شهر محل صدور" {...register("issueCity")} />
      

        {/* جنسیت */}
        <div className="flex flex-col">
              <label className="font-medium mb-1">جنسیت</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="مرد"
                    {...register("gender", { required: "جنسیت الزامی است" })}
                  />{" "}
                  مرد
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" value="زن" {...register("gender")} /> زن
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </span>
              )}
            </div>

            {/* دین */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">دین</label>
              <div className="flex gap-4 flex-wrap">
                {["اسلام", "یهودی", "مسیحی", "سایر"].map((val) => (
                  <label key={val} className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={val}
                      {...register("religion", {
                        required: "انتخاب دین الزامی است",
                      })}
                    />{" "}
                    {val}
                  </label>
                ))}
              </div>
              {errors.religion && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.religion.message}
                </span>
              )}
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
              label="تعداد خواهر و برادر"
              type="number"
              min={0}
              {...register("siblingsCount", {
                min: { value: 0, message: "تعداد نمی‌تواند منفی باشد" },
              })}
              error={errors.siblingsCount}
            />

            <Input
              label="تعداد فرزندان"
              type="number"
              min={0}
              {...register("childrenCount", {
                min: { value: 0, message: "تعداد نمی‌تواند منفی باشد" },
              })}
              error={errors.childrenCount}
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
            <Input
              label="کد پستی"
              {...register("postalCode", {
                pattern: {
                  value: /^\d{10}$/,
                  message: "کد پستی باید 10 رقمی باشد",
                },
              })}
              error={errors.postalCode}
            />
            <Input
              label="تلفن ثابت با کد شهر"
              {...register("phone", {
                pattern: {
                  value: /^\d{11}$/,
                  message: "تلفن باید 11 رقم باشد",
                },
              })}
              error={errors.phone}
            />
            <Input label="ایمیل" type="email" {...register("email")} />
            <Input
              label="نام تماس اضطراری"
              {...register("emergencyContactName")}
            />
            <Input label="نسبت" {...register("emergencyContactRelation")} />
            <Input
              label="تلفن ضروری"
              {...register("emergencyContactPhone", {
                pattern: {
                  value: /^\d{11}$/,
                  message: "شماره موبایل باید 11 رقمی باشد",
                },
              })}
              error={errors.emergencyContactPhone}
            />
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
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

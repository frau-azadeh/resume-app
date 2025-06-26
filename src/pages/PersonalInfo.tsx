import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import JalaliDateInput from "../components/ui/JalaliDatePicker";
import { todayJalali } from "../utils/date";

import type { AppDispatch, RootState } from "../store/store";
import { setPersonalInfo } from "../store/slices/personalInfoSlice";

interface PersonalInfoForm {
  avatar: string;
  birthDate: Dayjs | null;
  firstName: string;
  lastName: string;
  nationalCode: string;
  religion: string;
  gender: string;
  birthCity: string;
  birthProvince: string;
  idNumber: string;
  issueCity: string;
  issueProvince: string;
  fatherName: string;
  fatherJob: string;
  fatherEducation: string;
  motherName: string;
  motherJob: string;
  motherEducation: string;
  siblingsCount: number;
  childrenCount: number;
  maritalStatus: string;
  residenceProvince: string;
  residenceCity: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
}

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const savedInfo = useSelector(
    (state: RootState) => state.personalInfo.personalInfo,
  );

  const [avatarPreview, setAvatarPreview] = React.useState<string>(
    savedInfo.avatar || "",
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PersonalInfoForm>({
    defaultValues: {
      ...savedInfo,
      birthDate: savedInfo.birthDate ? dayjs(savedInfo.birthDate) : todayJalali(),
      avatar: savedInfo.avatar || "",
      birthCity: savedInfo.birthCity || "",
      birthProvince: savedInfo.birthProvince || "",
      idNumber: savedInfo.idNumber || "",
      issueCity: savedInfo.issueCity || "",
      issueProvince: savedInfo.issueProvince || "",
      fatherName: savedInfo.fatherName || "",
      fatherJob: savedInfo.fatherJob || "",
      fatherEducation: savedInfo.fatherEducation || "",
      motherName: savedInfo.motherName || "",
      motherJob: savedInfo.motherJob || "",
      motherEducation: savedInfo.motherEducation || "",
      siblingsCount: savedInfo.siblingsCount || 0,
      childrenCount: savedInfo.childrenCount || 0,
      maritalStatus: savedInfo.maritalStatus || "",
      residenceProvince: savedInfo.residenceProvince || "",
      residenceCity: savedInfo.residenceCity || "",
      address: savedInfo.address || "",
      postalCode: savedInfo.postalCode || "",
      phone: savedInfo.phone || "",
      email: savedInfo.email || "",
      emergencyContactName: savedInfo.emergencyContactName || "",
      emergencyContactRelation: savedInfo.emergencyContactRelation || "",
      emergencyContactPhone: savedInfo.emergencyContactPhone || "",
      religion: savedInfo.religion || "",
      gender: savedInfo.gender || "",
      firstName: savedInfo.firstName || "",
      lastName: savedInfo.lastName || "",
      nationalCode: savedInfo.nationalCode || "",
    },
  });

  React.useEffect(() => {
    reset({
      ...savedInfo,
      birthDate: savedInfo.birthDate ? dayjs(savedInfo.birthDate) : todayJalali(),
      avatar: savedInfo.avatar || "",
    });
    setAvatarPreview(savedInfo.avatar || "");
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
      const values = getValues();
      dispatch(
        setPersonalInfo({
          ...values,
          avatar: base64String,
          birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : null,
        }),
      );
      toast.success("عکس با موفقیت بارگذاری شد");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(
      setPersonalInfo({
        ...data,
        avatar: avatarPreview,
        birthDate: data.birthDate ? data.birthDate.format("YYYY-MM-DD") : null,
      }),
    );
    toast.success("اطلاعات با موفقیت ثبت شد!");
    navigate("/form/education");
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold text-center mb-4">اطلاعات فردی</h1>

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
          accept="image/*"
          onChange={handleAvatarUpload}
          className="mt-2"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* بخش اطلاعات فردی */}
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

            <Controller
              control={control}
              name="birthDate"
              rules={{ required: "تاریخ تولد الزامی است" }}
              render={({ field }) => (
                <JalaliDateInput
                  label="تاریخ تولد"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Input
              label="استان محل تولد"
              {...register("birthProvince", { required: "استان محل تولد الزامی است" })}
              error={errors.birthProvince}
            />
            <Input
              label="شهر محل تولد"
              {...register("birthCity", { required: "شهر محل تولد الزامی است" })}
              error={errors.birthCity}
            />
            <Input
              label="شماره شناسنامه"
              {...register("idNumber", { required: "شماره شناسنامه الزامی است" })}
              error={errors.idNumber}
            />
            <Input
              label="استان محل صدور"
              {...register("issueProvince", { required: "استان محل صدور الزامی است" })}
              error={errors.issueProvince}
            />
            <Input
              label="شهر محل صدور"
              {...register("issueCity", { required: "شهر محل صدور الزامی است" })}
              error={errors.issueCity}
            />

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
                  <input
                    type="radio"
                    value="زن"
                    {...register("gender", { required: "جنسیت الزامی است" })}
                  />{" "}
                  زن
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
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
                      {...register("religion", { required: "انتخاب دین الزامی است" })}
                    />{" "}
                    {val}
                  </label>
                ))}
              </div>
              {errors.religion && (
                <p className="text-red-500 text-sm">{errors.religion.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* بخش اطلاعات خانوادگی */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">اطلاعات خانوادگی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="نام پدر"
              {...register("fatherName", { required: "نام پدر الزامی است" })}
              error={errors.fatherName}
            />
            <Input
              label="شغل پدر"
              {...register("fatherJob", { required: "شغل پدر الزامی است" })}
              error={errors.fatherJob}
            />
            <Input
              label="تحصیلات پدر"
              {...register("fatherEducation", { required: "تحصیلات پدر الزامی است" })}
              error={errors.fatherEducation}
            />
            <Input
              label="نام مادر"
              {...register("motherName", { required: "نام مادر الزامی است" })}
              error={errors.motherName}
            />
            <Input
              label="شغل مادر"
              {...register("motherJob", { required: "شغل مادر الزامی است" })}
              error={errors.motherJob}
            />
            <Input
              label="تحصیلات مادر"
              {...register("motherEducation", { required: "تحصیلات مادر الزامی است" })}
              error={errors.motherEducation}
            />
            <Input
              type="number"
              label="تعداد خواهر و برادر"
              {...register("siblingsCount", {
                required: "تعداد خواهر و برادر الزامی است",
                valueAsNumber: true,
                min: { value: 0, message: "نباید منفی باشد" },
              })}
              error={errors.siblingsCount}
            />
            <Input
              type="number"
              label="تعداد فرزند"
              {...register("childrenCount", {
                required: "تعداد فرزند الزامی است",
                valueAsNumber: true,
                min: { value: 0, message: "نباید منفی باشد" },
              })}
              error={errors.childrenCount}
            />
            <Input
              label="وضعیت تاهل"
              {...register("maritalStatus", { required: "وضعیت تاهل الزامی است" })}
              error={errors.maritalStatus}
            />
          </div>
        </div>

        {/* بخش اطلاعات تماس */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">اطلاعات تماس</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="استان محل سکونت"
              {...register("residenceProvince", { required: "استان محل سکونت الزامی است" })}
              error={errors.residenceProvince}
            />
            <Input
              label="شهر محل سکونت"
              {...register("residenceCity", { required: "شهر محل سکونت الزامی است" })}
              error={errors.residenceCity}
            />
            <Input
              label="آدرس"
              {...register("address", { required: "آدرس الزامی است" })}
              error={errors.address}
            />
            <Input
              label="کد پستی"
              {...register("postalCode", {
                required: "کد پستی الزامی است",
                pattern: {
                  value: /^\d{10}$/,
                  message: "کد پستی باید ۱۰ رقم باشد",
                },
              })}
              error={errors.postalCode}
            />
            <Input
              label="تلفن ثابت"
              {...register("phone", {
                required: "تلفن ثابت الزامی است",
                pattern: {
                  value: /^\d+$/,
                  message: "تلفن باید فقط عدد باشد",
                },
              })}
              error={errors.phone}
            />
            <Input
              label="ایمیل"
              {...register("email", {
                required: "ایمیل الزامی است",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "ایمیل معتبر نیست",
                },
              })}
              error={errors.email}
            />
          </div>
        </div>

        {/* بخش اطلاعات تماس اضطراری */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">تماس اضطراری</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="نام تماس اضطراری"
              {...register("emergencyContactName", { required: "نام تماس اضطراری الزامی است" })}
              error={errors.emergencyContactName}
            />
            <Input
              label="نسبت تماس اضطراری"
              {...register("emergencyContactRelation", { required: "نسبت تماس اضطراری الزامی است" })}
              error={errors.emergencyContactRelation}
            />
            <Input
              label="شماره تماس اضطراری"
              {...register("emergencyContactPhone", {
                required: "شماره تماس اضطراری الزامی است",
                pattern: {
                  value: /^\d+$/,
                  message: "شماره تماس باید فقط عدد باشد",
                },
              })}
              error={errors.emergencyContactPhone}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit">ذخیره و ادامه</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

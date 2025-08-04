import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { supabase } from "../../lib/supabase";
import type { PersonalInfoForm } from "../../types/types";
import { emptyPersonalInfo } from "../../utils/emptyPersonalInfo";
import DateObject from "react-date-object";

interface State {
  personalInfo: Partial<PersonalInfoForm>;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  personalInfo: {},
  loading: false,
  error: null,
};

export const fetchPersonalInfo = createAsyncThunk(
  "personalInfo/fetch",
  async (_, { rejectWithValue }) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return rejectWithValue("کاربر پیدا نشد");

    const { data: existing, error: existingError } = await supabase
      .from("personal_infos")
      .select("id")
      .eq("user_id", user.id);

    if (existingError) return rejectWithValue(existingError.message);

    if (!existing || existing.length === 0) {
      const { error: insertError } = await supabase.from("personal_infos").insert({
        user_id: user.id,
        ...emptyPersonalInfo,
      });

      if (insertError) return rejectWithValue(insertError.message);
    }

    const { data, error } = await supabase
      .from("personal_infos")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) return rejectWithValue(error.message);

    return data;
  }
);

export const savePersonalInfo = createAsyncThunk(
  "personalInfo/save",
  async (data: PersonalInfoForm, { rejectWithValue }) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return rejectWithValue("کاربر پیدا نشد");

    const { birth_date, ...rest } = data;

    const formattedBirthDate =
  typeof birth_date === "string"
    ? birth_date
    : birth_date instanceof DateObject
    ? birth_date.format("YYYY-MM-DD")
    : null;

    const { error: upsertError } = await supabase.from("personal_infos").upsert({
      user_id: user.id,
      birth_date: formattedBirthDate,
      ...rest,
    });

    if (upsertError) return rejectWithValue(upsertError.message);

    return data;
  }
);
const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(savePersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePersonalInfo.fulfilled, (state, action) => {
        state.personalInfo = action.payload;
        state.loading = false;
      })
      .addCase(savePersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default personalInfoSlice.reducer;
export const selectPersonalInfo = (state: RootState) =>
  state.personalInfo.personalInfo;

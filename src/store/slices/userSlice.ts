import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

interface UserState {
  user: { id: string; email?: string } | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("User not found");
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;

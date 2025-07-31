const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", isAdmin: false, status: false },
  reducers: {
    changeUserState: (state, action) => {
      const { name, email, isAdmin, status } = action.payload;
      console.log("slice: ", action.payload);
      return { name, email, isAdmin, status };
    },
  },
});

export const { changeUserState } = userSlice.actions;
export default userSlice.reducer;

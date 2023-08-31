import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postData = createAsyncThunk("postData", async (data, thunkAPI) => {
  const config = {
    method: "post",
    url: "https://take-home-test-api.nutech-integrasi.app/topup",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer  `,
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
});

const initialState = {};

// Then, handle actions in your reducers:
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Do something while pending if you want.
    builder.addCase(postData.pending, (state, action) => {});
    // Do something when passes.
    builder.addCase(postData.fulfilled, (state, action) => {});
    // Do something if fails.
    builder.addCase(postData.rejected, (state, action) => {});
  },
});

export default dataSlice.reducer;

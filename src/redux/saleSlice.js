// src/redux/saleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases } from '../utils/appwrite';
import conf from '../utils/conf';

export const fetchSaleStatus = createAsyncThunk('sale/fetchSaleStatus', async () => {
  const res = await databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteCategoryCollectionId
  );
  const S = res.documents.filter(item => item.title === "sale");
  return S[0]?.product?.length > 0;
});

const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    isSale: false,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSaleStatus.fulfilled, (state, action) => {
        state.isSale = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSaleStatus.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default saleSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch Customer Orders
export const fetchCustomerOrders = createAsyncThunk(
  "customer/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // ✅ Ensure this URL matches the backend
      const response = await axios.get(`http://localhost:5000/api/orders/user`, config);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);


// ✅ Fetch Order Tracking Details
export const fetchOrderTracking = createAsyncThunk(
  "customer/fetchTracking",
  async (trackingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      console.log("📡 Fetching tracking details for:", trackingId);
      const response = await axios.get(`http://localhost:5000/api/orders/track/${trackingId}`, config);
      console.log("✅ Tracking data received:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Tracking API Error:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Tracking not found");
    }
  }
);

// ✅ Update Customer Profile
export const updateCustomerProfile = createAsyncThunk(
  "customer/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

      console.log("📡 Updating customer profile...");
      const response = await axios.put(`http://localhost:5000/api/customer/profile`, userData, config);
      console.log("✅ Profile updated:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Profile Update Error:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    orders: [], // ✅ Always an array
    tracking: null,
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ✅ Fetch Orders
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        console.log("✅ API Response:", action.payload); // Debug the actual data
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        console.error("❌ Redux Error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Order Tracking
      .addCase(fetchOrderTracking.pending, (state) => {
        state.tracking = null;
      })
      .addCase(fetchOrderTracking.fulfilled, (state, action) => {
        console.log("✅ Redux Tracking Data:", action.payload);
        state.tracking = action.payload;
      })
      .addCase(fetchOrderTracking.rejected, (state, action) => {
        state.tracking = null;
        state.error = action.payload;
      })

      // ✅ Update Customer Profile
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        console.log("✅ Redux Profile Updated:", action.payload);
        state.profile = action.payload;
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;

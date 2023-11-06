import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const sendData = createAsyncThunk("sendData", async (data) => {
  console.log(data);
  const resp = await fetch("/toServer", {
    method: "post",
    body: JSON.stringify(data),
  });
  return resp.json();
});
const formData = createSlice({
  name: "formData",
  initialState: {
    isSending: "IDLE",
    personalinfos: {
      name: {
        placeholder: "e.g. Stephen King",
        value: "",
      },
      email: {
        placeholder: "e.g. stephenking@lorem.com",
        value: "",
      },
      tel: {
        placeholder: "e.g. +1 234 567 890",
        value: "",
      },
    },
    type: "monthly",
    plans: {
      arcade: {
        checked: true,
        icon: "./assets/images/icon-arcade.svg",
        price: {
          monthly: 12,
          yearly: 120,
          yearlyOffer: "2 months free",
        },
      },
      advanced: {
        checked: false,
        icon: "./assets/images/icon-advanced.svg",
        price: {
          monthly: 12,
          yearly: 120,
          yearlyOffer: "2 months free",
        },
      },
      pro: {
        checked: false,
        icon: "./assets/images/icon-pro.svg",
        price: {
          monthly: 12,
          yearly: 120,
          yearlyOffer: "2 months free",
        },
      },
    },
    addOns: {
      onlineServices: {
        title: "Online service",
        description: "Access to multiplayer games",
        isChecked: false,
        price: {
          monthly: 1,
          yearly: 10,
        },
      },
      largerStorage: {
        title: "Larger storage",
        description: "Extra 1TB of cloud save",
        isChecked: false,
        price: {
          monthly: 2,
          yearly: 20,
        },
      },
      costumizableProfile: {
        title: "Customizable profile",
        description: "Custom theme on your profile",
        isChecked: false,
        price: {
          monthly: 2,
          yearly: 20,
        },
      },
    },
  },
  reducers: {
    setType(state, action) {
      state.type = action.payload;
    },
    setPersonalInfos(state, action) {
      state.personalinfos.name.value = action.payload.name;
      state.personalinfos.email.value = action.payload.email;
      state.personalinfos.tel.value = action.payload.tel;
    },
    setPlans(state, action) {
      state.plans.advanced.checked = action.payload.advanced;
      state.plans.arcade.checked = action.payload.arcade;
      state.plans.pro.checked = action.payload.pro;
    },
    setAddOn(state, action) {
      state.addOns[action.payload.ele].isChecked = action.payload.isChecked;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(sendData.pending, (state, action) => {
        state.isSending = "OPERATING";
      })
      .addCase(sendData.fulfilled, (state) => {
        state.isSending = "SENT";
      })
      .addCase(sendData.rejected, (state) => {
        state.isSending = "FAILED";
      });
  },
});
export const selectFormData = (state) => state.formData;
export const { setType, setPersonalInfos, setPlans, setAddOn } =
  formData.actions;
export default formData.reducer;

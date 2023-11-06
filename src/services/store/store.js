import { configureStore } from "@reduxjs/toolkit";
import formData from "./features/formData";
import senario from "./features/senario";
const store = configureStore({
  reducer: {
    formData,
    senario,
  },
});
export default store;

import { createSlice } from "@reduxjs/toolkit";
const senario = createSlice({
  name: "senario",
  initialState: {
    isValid: false,
    currentIndex: 0,
    currentStep: "your info",
    steps: ["your info", "select plan", "add-on", "summary"],
  },
  reducers: {
    nextStep(state) {
      let { currentIndex, steps } = state;
      let nextIndex =
        currentIndex >= steps.length - 1 ? steps.length - 1 : ++currentIndex;
      state.currentIndex = nextIndex;
      state.currentStep = steps[nextIndex];
    },
    backStep(state) {
      let { currentIndex, steps } = state;
      let backStep = currentIndex <= 0 ? 0 : --currentIndex;
      state.currentIndex = backStep;
      state.currentStep = steps[backStep];
    },
    setCurrentForm(state, action) {
      state.currentForm = action.payload;
    },
    validate(state, action) {
      state.isValid = action.payload;
    },
    goToStep(state, action) {
      state.currentStep = state.steps.find((per) => per === action.payload);
      state.currentIndex = state.steps.indexOf(state.currentStep);
    },
  },
});
export const selectSenario = (state) => state.senario;
export const { nextStep, backStep, setCurrentForm, validate, goToStep } =
  senario.actions;
export default senario.reducer;

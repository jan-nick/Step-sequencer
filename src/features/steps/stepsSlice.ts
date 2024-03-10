import { createSlice } from "@reduxjs/toolkit";

const createSteps = () => {
  const result = [];
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 1; j++) {
      for (let k = 1; k <= 4; k++) {
        result.push({ active: false, position: `${i}.${j}.${k}` });
      }
    }
  }

  return result;
};

export const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    value: createSteps(),
  },
  reducers: {
    toggleStep: (
      state,
      action: {
        payload: { index: number };
        type: string;
      }
    ) => {
      const { index } = action.payload;
      const newSteps = [...state.value];

      newSteps[index].active = !newSteps[index].active;

      state.value = newSteps;
    },
  },
});

export const { toggleStep } = stepsSlice.actions;

export default stepsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const currentTime =
  new Date()
    .toTimeString()
    .slice(0, 5);

const now = new Date();

const currentDate = `${now.getFullYear()}-${String(
  now.getMonth() + 1
).padStart(2, "0")}-${String(
  now.getDate()
).padStart(2, "0")}`;

const initialState = {
  hcp_name: "",
  interaction_type: "",
  follow_up_date: currentDate,
  time: currentTime,
  hospital: "",
  sentiment: "",
  products_discussed: [],
  materials_requested: [],
  objections: [],
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    updateInteraction: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        const value = action.payload[key];

        if (key === "sentiment") {
          const validSentiments = [
            "positive",
            "neutral",
            "negative",
          ];

          if (
            value &&
            validSentiments.includes(
              value.toLowerCase()
            )
          ) {
            state.sentiment = value;
          }

          return;
        }

        if (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          state[key] = value;
        }
      });
    },
  },
});

export const {
  updateInteraction,
  clearInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;
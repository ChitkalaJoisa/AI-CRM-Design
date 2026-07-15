import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { updateInteraction } from "../redux/interactionSlice";

export default function InteractionForm() {
  const dispatch = useDispatch();

  const now = new Date();

  const currentDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;

  const currentTime = () => {
    const now = new Date();

    return `${String(
      now.getHours()
    ).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  };

  const interaction = useSelector(
    (state) => state.interaction
  );

  console.log(
    "Current Redux State:",
    interaction
  );

  return (
    <Card
      sx={{
        borderRadius: 4,
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <CardContent>
        {/* HCP Name */}
        <TextField
          fullWidth
          label="HCP Name"
          margin="normal"
          value={
            interaction.hcp_name || ""
          }
        />

        {/* Interaction Type */}
        <TextField
          select
          fullWidth
          label="Interaction Type"
          margin="normal"
          value={
            interaction.interaction_type ||
            ""
          }
        >
          <MenuItem value="meeting">
            Meeting
          </MenuItem>

          <MenuItem value="call">
            Call
          </MenuItem>

          <MenuItem value="email">
            Email
          </MenuItem>
        </TextField>

        <TextField
          type="date"
          fullWidth
          margin="normal"
          value={interaction.follow_up_date}
          onChange={(e) =>
            dispatch(
              updateInteraction({
                follow_up_date: e.target.value,
              })
            )
          }
        />

        {/* Time */}
        <TextField
          fullWidth
          label="Time"
          type="time"
          margin="normal"
          value={
            interaction.time
          }
          onChange={(e) =>
            dispatch(
              updateInteraction({
                time:e.target.value,
              })
            )
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        {/* Hospital */}
        <TextField
          fullWidth
          label="Hospital"
          margin="normal"
          value={
            interaction.hospital || ""
          }
        />

        {/* Sentiment */}
        <Chip
          sx={{
            mt: 2,
            mb: 2,
          }}
          label={
            interaction.sentiment ||
            "Neutral"
          }
          color={
            interaction.sentiment ===
              "positive"
              ? "success"
              : interaction.sentiment ===
                "negative"
                ? "error"
                : "warning"
          }
        />

        {/* Products Discussed */}
        <TextField
          multiline
          rows={4}
          fullWidth
          label="Products Discussed"
          margin="normal"
          value={
            Array.isArray(
              interaction.products_discussed
            )
              ? interaction.products_discussed.join(
                ", "
              )
              : interaction.products_discussed ||
              ""
          }
        />

        {/* Materials Shared */}
        <TextField
          multiline
          rows={3}
          fullWidth
          label="Materials Shared"
          margin="normal"
          value={
            Array.isArray(
              interaction.materials_requested
            )
              ? interaction.materials_requested.join(
                ", "
              )
              : interaction.materials_requested ||
              ""
          }
        />

        {/* Objections */}
        <TextField
          multiline
          rows={3}
          fullWidth
          label="Objections"
          margin="normal"
          value={
            Array.isArray(
              interaction.objections
            )
              ? interaction.objections.join(
                ", "
              )
              : interaction.objections ||
              ""
          }
        />
      </CardContent>
    </Card>
  );
}
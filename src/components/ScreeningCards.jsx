import React from "react";
import { Box, Typography, Checkbox, IconButton, Grid, Paper, TextField, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ScreeningQuestionCard = ({
  question = "Are you willing to undergo a background check, in accordance with local law/regulations?",
  idealAnswer = "Yes",
  mustHave = false,
  onMustHaveChange,
  onRemove,
  isCustom = false,
  customValue = "",
  onCustomChange,
  handleIdealAnswerChange,
  customIdealAnswer,form, setForm,
}) => (
  <Paper
    variant="outlined"
    sx={{
      borderRadius: 2,
      p: 2,
      mb: 2,
      position: "relative",
      minHeight: 80,
    }}
  >
    <Grid container justifyContent={"space-between"} spacing={2}>
      <Grid item xs={11}>
        {isCustom ? (
          <TextField
            fullWidth
            label="Enter your custom question"
            name="customQuestion"
            value={form.customQuestion || ""}
            onChange={onCustomChange}
            placeholder="Enter your custom question"
            size="small"
          />
        ) : (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {question}
          </Typography>
        )}
      </Grid>
      <Grid item xs={1} sx={{ textAlign: "right" }}>
        <IconButton size="small" onClick={onRemove}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
    <Grid container justifyContent={"space-between"} spacing={2} alignSelf={"center"}>
      <Grid item xs={12} sm={6}>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
            Ideal answer:
          </Typography>
          {isCustom ? (
            <Select
              value={customIdealAnswer}
              onChange={handleIdealAnswerChange}  // You may want a separate handler for idealAnswer
              size="small"
              sx={{ mt: 0.5, minWidth: 80 }}
              defaultValue="Yes"

            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          ) : (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {idealAnswer}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
        <Checkbox
          checked={mustHave}
          onChange={onMustHaveChange}
        />
        <Typography variant="body2" color="text.secondary">
          Must—have qualification
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default ScreeningQuestionCard;
import React from "react";
import { Box, Typography, Checkbox, IconButton, Grid, Paper, TextField, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ScreeningQuestionCard = ({
    question, // This will now be the actual question string
    idealAnswer, // This will be the actual ideal answer string
    mustHave, // This will be the boolean for must-have
    onMustHaveChange, // New prop for must-have checkbox change
    onRemove,
    isCustom = false,
    customValue, // This is now used for TextField value for custom question
    onCustomChange, // New prop for custom question text field change
    onIdealAnswerChange, // New prop for ideal answer select change
}) => (
    <Paper
        variant="outlined"
        sx={{
            borderRadius: 2,
            p: 2,
            mb: 2,
            position: "relative",
            minHeight: 80,
            backgroundColor: "#F6F6F6",
        }}
    >
        <Grid container justifyContent={"space-between"} spacing={2}>
            <Grid item xs={11}>
                {isCustom ? (
                    <TextField
                        fullWidth
                        label="Enter your custom question"
                        name="customQuestion"
                        value={customValue} // Use customValue prop
                        onChange={onCustomChange} // Use onCustomChange prop
                        placeholder="Enter your custom question"
                        size="small"
                    />
                ) : (
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {question} {/* Display the question prop */}
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
                    <Select
                        value={idealAnswer} // Use idealAnswer prop
                        onChange={onIdealAnswerChange} // Use onIdealAnswerChange prop
                        size="small"
                        sx={{ mt: 0.5, minWidth: 80 }}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                <Checkbox
                    checked={mustHave} // Use mustHave prop
                    onChange={onMustHaveChange} // Use onMustHaveChange prop
                />
                <Typography variant="body2" color="text.secondary">
                    Must - have qualification
                </Typography>
            </Grid>
        </Grid>
    </Paper>
);

export default ScreeningQuestionCard;
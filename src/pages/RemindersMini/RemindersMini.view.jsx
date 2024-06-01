import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CircleIcon from "@mui/icons-material/Circle";

function createData(id, title, time, description, viewed) {
    return { id, title, time, description, viewed };
}

let rows = [
    createData(
        "reminder10",
        "Reminder Title",
        "14 min",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra neque, lectus dui ullamcorper sit quis. Scelerisque suspendisse tristique etiam eleifend sit ut.",
        false
    ),
    createData(
        "reminder11",
        "Reminder Title",
        "1 day",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra neque, lectus dui ullamcorper sit quis. Scelerisque suspendisse tristique etiam eleifend sit ut.",
        false
    ),
    createData(
        "reminder12",
        "Reminder Title",
        "2 days",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra neque, lectus dui ullamcorper sit quis. Scelerisque suspendisse tristique etiam eleifend sit ut.",
        false
    ),
    createData(
        "reminder13",
        "Reminder Title",
        "1 month",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra neque, lectus dui ullamcorper sit quis. Scelerisque suspendisse tristique etiam eleifend sit ut.",
        true
    ),
    createData(
        "reminder14",
        "Reminder Title",
        "1 month",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra neque, lectus dui ullamcorper sit quis. Scelerisque suspendisse tristique etiam eleifend sit ut.",
        true
    ),
];

const RemindersMini = () => {
    return (
        <Box sx={{ mx: "auto" }} maxWidth="sm">
            <Box
                sx={{
                    bgcolor: "#E0E0E0",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    py: 2,
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: "#323232",
                    }}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="medium" />
                </Button>
                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    Reminders
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    px: 2.5,
                    py: 4,
                }}
            >
                {rows.map((row) => (
                    <Box
                        sx={{
                            bgcolor: row.viewed ? "#F2F2F2" : "#E0E0E0",
                            borderRadius: 3,
                            pt: 2,
                            pb: 1.5,
                            pr: 1,
                            pl: 2,
                        }}
                        key={row?.id}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignContent: "flex-start",
                                pb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#333333",
                                    }}
                                    variant="subtitle2"
                                    component="div"
                                >
                                    {row.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: row.viewed
                                            ? "#93A3BC"
                                            : "#4F4F4F",
                                    }}
                                >
                                    {row.time}
                                </Typography>
                            </Box>
                            <Box>
                                {!row.viewed && (
                                    <CircleIcon
                                        fontSize="small"
                                        sx={{ color: "#2F80ED" }}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                component="div"
                                variant="body2"
                                sx={{
                                    color: "#4F4F4F",
                                    mr: 4,
                                    lineHeight: "24px",
                                }}
                            >
                                {row.description}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RemindersMini;

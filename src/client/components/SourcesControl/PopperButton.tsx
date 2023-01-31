import React from 'react';
import { Box, IconButton, Typography, Popper, ClickAwayListener } from "@mui/material"
import { Layers as LayersIcon } from "@mui/icons-material";
import ControlPanel from './ControlPanel';

import './PopperButton.scss';

const PopperButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handlePopperOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handlePopperClose = () => {
        setAnchorEl(null);
    };
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        handlePopperClose();
    };
    const open = Boolean(anchorEl);
    const id = open ? 'sources-button' : undefined;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
        <Box id="sources-button">
            <Typography
                aria-owns={id}
                aria-haspopup="true"
                onClick={handlePopperOpen}
            >
                <IconButton>
                    <LayersIcon />
                </IconButton>

            </Typography>
            <Popper
                id="sources-popper"
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
            >
                < ControlPanel />
            </Popper>
        </Box>
        </ClickAwayListener>
    );
}

export default PopperButton;
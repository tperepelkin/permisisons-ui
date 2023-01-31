import React from 'react';
import { RootState } from '../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, SwipeableDrawer, Paper, Typography, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalsSlice } from '../store/slices/modals.slice';

import './InfoPanel.scss';

const InfoPanel = (): React.ReactElement => {
    const adsbList = useSelector((state: RootState) => state.map.adsbList);
    const mlatList = useSelector((state: RootState) => state.map.mlatList);
    const psrList = useSelector((state: RootState) => state.map.psrList);

    // const foundMarker = adsbList.find(it => selectedMarker.targetNumber === it.targetNumber);
    const infoPanelRecord = useSelector((state: RootState) => state.modals.infoPanelRecord);
    const isInfoPanelOpened = useSelector((state: RootState) => state.modals.infoPanelIsOpen);
    const dispatch = useDispatch();

    const togglePanel = (value: boolean) => {
        dispatch(modalsSlice.actions.toggleInfoPanel(value))
    }

    const handleClose = () => {
        dispatch(modalsSlice.actions.toggleInfoPanel(false))
        dispatch(modalsSlice.actions.resetInfoPanelRecord())
    }

    return (
        <SwipeableDrawer
            className="target-info-wrapper"
            variant="persistent"
            anchor="bottom"
            onClose={() => togglePanel(false)}
            onOpen={() => togglePanel(true)}
            open={isInfoPanelOpened}
        >
            <Box component="span">
                <Typography variant={"h3"}>Информация о наблюдаемом объекте</Typography>

                <IconButton className="close-button" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <Box className="info-wrapper">
                                <Typography variant={"body2"}>
                                    Тип:<b>{infoPanelRecord.sacSic}</b>
                                </Typography>
                                <Typography variant={"body2"}>
                                    ICAO:<b>{(infoPanelRecord as any).icao}</b>
                                </Typography>
                                <Typography variant={"body2"}>
                                    CallSign:<b>{(infoPanelRecord as any).callSign}</b>
                                </Typography>
                                <Typography variant={"body2"}>
                                    Squawk:<b>{(infoPanelRecord as any).squawk}</b>
                                </Typography>
                                <Typography variant={"body2"}>
                                    Lat:
                                    <b>{infoPanelRecord.latitude}</b>
                                </Typography>
                                <Typography variant={"body2"}>
                                    Lon:<b>{infoPanelRecord.longitude}</b>
                                </Typography>
                                <Typography variant={"body2"}>
                                    Alt:<b>{infoPanelRecord.altitude}</b>
                                </Typography>
                            </Box>
                    </Grid>
                </Grid>
            </Box>
        </SwipeableDrawer>

    )
}

export default InfoPanel;
import React from 'react';
import { Box, Collapse, Typography } from "@mui/material"
import { FormControlLabel, FormGroup, Checkbox } from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { mapSlice } from '../../store/slices/map.slice';
import { SourceKey, SourceType } from '../../interfaces/sources';

import './ControlPanel.scss';

const ControlPanel = (): React.ReactElement => {
    const adsbGroupsToggler = useSelector((state: RootState) => state.map.adsbGroupsToggler);
    const mlatGroupsToggler = useSelector((state: RootState) => state.map.mlatGroupsToggler);
    const psrGroupsToggler = useSelector((state: RootState) => state.map.psrGroupsToggler);

    const dispatch = useDispatch();

    const [adsbOpen, setAdsbOpen] = React.useState(false);
    const [mlatOpen, setMlatOpen] = React.useState(false);
    const [psrOpen, setPsrOpen] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sourceGroup = event.target?.name;
        const groupNumber = parseInt(event.target.value);
        if (sourceGroup && groupNumber) {
            switch (sourceGroup as SourceKey) {
                case SourceType[SourceType.adsb] as SourceKey:
                    dispatch(mapSlice.actions.toggleAdsbGroup(groupNumber));
                    break;
                case SourceType[SourceType.mlat] as SourceKey:
                    dispatch(mapSlice.actions.toggleMlatGroup(groupNumber));
                    break;
                case SourceType[SourceType.psr] as SourceKey:
                    dispatch(mapSlice.actions.togglePsrGroup(groupNumber));
                    break;
            }
        }
    };

    const toggleAdsbGroup = () => {
        setAdsbOpen(!adsbOpen);
    }

    const toggleMlatGroup = () => {
        setMlatOpen(!mlatOpen);
    }

    const togglePsrGroup = () => {
        setPsrOpen(!psrOpen);
    }

    return (
        <Box className="layers-control">
            <Box className="source-wrapper">
                Источники
                <Box className="wrapper">
                    <Box className="source">
                        <Typography>АДСН</Typography>
                        <Typography onClick={toggleAdsbGroup}>
                            {adsbOpen ? <ExpandLess /> : <ExpandMore />}
                        </Typography>
                    </Box>
                    <Collapse in={adsbOpen} timeout="auto" unmountOnExit>
                        <FormGroup>
                            {Object.keys(adsbGroupsToggler).map(it => parseInt(it)).map(it => (
                                <FormControlLabel
                                    key={`adsb-${it}`}
                                    control={
                                        <Checkbox
                                            checked={adsbGroupsToggler[it]}
                                            onChange={handleChange}
                                            name={SourceType[SourceType.adsb] as SourceKey}
                                            value={it} />
                                    }
                                    label={it.toString(16).toUpperCase()}
                                />
                            ))}
                        </FormGroup>
                    </Collapse>
                </Box >
                <Box className="wrapper">
                    <Box className="source">
                        <Typography>МЛАТ</Typography>
                        <Typography onClick={toggleMlatGroup}>
                            {mlatOpen ? <ExpandLess /> : <ExpandMore />}
                        </Typography>
                    </Box>
                    <Collapse in={mlatOpen} timeout="auto" unmountOnExit>
                        <FormGroup>
                            {Object.keys(mlatGroupsToggler).map(it => parseInt(it)).map(it => (
                                <FormControlLabel
                                    key={`mlat-${it}`}
                                    control={
                                        <Checkbox
                                            checked={mlatGroupsToggler[it]}
                                            onChange={handleChange}
                                            name={SourceType[SourceType.mlat] as SourceKey}
                                            value={it}
                                        />
                                    }
                                    label={it.toString(16).toUpperCase()}
                                />
                            ))}
                        </FormGroup>
                    </Collapse>
                </Box >
                <Box className="wrapper">
                    <Box className="source">
                        <Typography>ПСР</Typography>
                        <Typography onClick={togglePsrGroup}>
                            {psrOpen ? <ExpandLess /> : <ExpandMore />}
                        </Typography>
                    </Box>
                    <Collapse in={psrOpen} timeout="auto" unmountOnExit>
                        <FormGroup>
                            {Object.keys(psrGroupsToggler).map(it => parseInt(it)).map(it => (
                                <FormControlLabel
                                key={`psr-${it}`}
                                    control={
                                        <Checkbox
                                            checked={psrGroupsToggler[it]}
                                            onChange={handleChange}
                                            name={SourceType[SourceType.psr] as SourceKey}
                                            value={it}
                                        />
                                    }
                                    label={it.toString(16).toUpperCase()}
                                />
                            ))}
                        </FormGroup>
                    </Collapse>
                </Box >
            </Box>
        </Box>
    );
}

export default ControlPanel;
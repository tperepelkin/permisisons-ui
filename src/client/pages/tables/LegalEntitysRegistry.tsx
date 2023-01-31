import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, FormHelperText, FormGroup, TextField, Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import SplitPane from 'react-split-pane';
import SplitPane, { Pane, SashContent } from 'split-pane-react';

import './UsersRegistry.scss';
import { Stack } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface AppState {
    panes: Array<any>;
}

function style(color: string): object {
    return {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color
    };
}

const LegalEntitysRegistry = () => {
    const [date, setDate] = React.useState<Dayjs | null>(null);

    return (
        <Container disableGutters className="registry-container" sx={{ ml: '5rem', w: '100vw', }}>
            <Box>
                <Typography variant="h6" align="left">
                    Учётные данные об организации
                </Typography>
                <Box className="input-container" sx={{ mt: 1 }}>
                    <FormGroup className="ogranization-base-info" sx={{ width: '30rem', }}>
                        <FormControl size="small">
                            <InputLabel required htmlFor="user-lastname">Наименование организации</InputLabel>
                            <Input id="user-lastname" size="small" multiline rows={3} />
                        </FormControl>
                        <FormControl size="small" >
                            <InputLabel required htmlFor="user-firstname">Адрес организации</InputLabel>
                            <Input id="user-firstname" multiline rows={3} />
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="pasport" sx={{ width: '30rem', mt: 2 }}>
                        <FormControl size="small">
                            <InputLabel required htmlFor="pasport-series">ИНН</InputLabel>
                            <Input id="inn" />
                        </FormControl>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl size="small" sx={{ width: '15rem' }}>
                                <InputLabel required htmlFor="pasport-number">ОГРН</InputLabel>
                                <Input id="ogrn" />
                            </FormControl>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '10rem' }}>
                                <Typography variant="body1" align="left">от</Typography>
                                <FormControl size="small">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>
                        </Box>

                    </FormGroup>
                </Box>
                <Box sx={{ mt: 3, width: "30rem" }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" sx={{ fontSize: '12px' }}>Редактировать</Button>
                        <Button variant="outlined" sx={{ fontSize: '12px' }}>Удалить</Button>
                        <Button variant="outlined" href="#contained-buttons" sx={{ fontSize: '12px', textAlign: 'center' }}>Новая запись</Button>
                        <Button variant="outlined" href="#contained-buttons" sx={{ fontSize: '12px' }}>Очистить</Button>
                    </Stack>
                </Box>
            </Box>
            <Box></Box>
        </Container>
    );
};

export default LegalEntitysRegistry;
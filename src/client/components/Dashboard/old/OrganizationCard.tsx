import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, FormHelperText, FormGroup, TextField, Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import './UserCard.scss';

function OrganizationCard() {
    const [date, setDate] = React.useState<Dayjs | null>(null);

    return (
        <Container disableGutters className="registry-container" sx={{ ml: '5rem', w: '100vw', }}>
            <Box>
                <Box className="input-container" sx={{ mt: 1 }}>
                    <FormGroup className="ogranization-base-info" sx={{ width: '30rem', }}>
                        <FormControl size="small">
                            <InputLabel required htmlFor="user-lastname">Наименование организации</InputLabel>
                            <Input id="user-lastname" size="small" multiline rows={3} />
                        </FormControl>
                        <FormControl size="small">
                            <InputLabel required htmlFor="user-firstname">Адрес организации</InputLabel>
                            <Input id="user-firstname" multiline rows={3} />
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="pasport" sx={{ width: '30rem', mt: 2 }}>
                        <FormControl size="small">
                            <InputLabel required htmlFor="pasport-series">ИНН</InputLabel>
                            <Input id="inn" />
                        </FormControl>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, 'justify-content': 'space-between', }}>
                            <FormControl size="small" sx={{ width: '15rem', alignSelf: 'end', }}>
                                <InputLabel required htmlFor="pasport-number">ОГРН</InputLabel>
                                <Input id="ogrn" />
                            </FormControl>
                            <Typography variant="body1" align="left" sx={{ alignSelf: 'end', }}>от</Typography>
                            <Box sx={{
                                display: 'flex', flexWrap: 'wrap', width: '10rem',
                                '& fieldset': {
                                    borderLeftColor: 'transparent',
                                    borderTopColor: 'transparent',
                                    borderRightColor: 'transparent',
                                }
                            }}>
                                <FormControl size="small">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            inputFormat="DD/MM/YYYY"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            } }
                                            renderInput={(params) => <TextField {...params} />} />
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>
                        </Box>

                    </FormGroup>
                </Box>
            </Box>
        </Container>
    );
}

export default OrganizationCard;
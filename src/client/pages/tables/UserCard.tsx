import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, FormHelperText, FormGroup, TextField, Button } from '@mui/material';

import './UserCard.scss';

const UsersCard = () => {
    return (
        <Container disableGutters className="registry-container" sx={{ ml: '1rem', }}>
            <Box>
                <Box className="input-container" sx={{ mt: 1 }}>
                    <FormGroup className="user-info" sx={{ width: '30rem', }}>
                        <FormControl size="small">
                            <InputLabel required htmlFor="user-lastname">Фамилия</InputLabel>
                            <Input id="user-lastname" size="small" />
                        </FormControl>
                        <FormControl size="small" >
                            <InputLabel required htmlFor="user-firstname">Имя</InputLabel>
                            <Input id="user-firstname" />
                        </FormControl>
                        <FormControl size="small" >
                            <InputLabel required htmlFor="user-patronimyc">Отчество</InputLabel>
                            <Input id="user-patronimyc" />
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="pasport" sx={{ width: '30rem', mt: 2 }}>
                        <InputLabel>Паспорт</InputLabel>
                        <FormControl size="small">
                            <InputLabel required htmlFor="pasport-series">Серия</InputLabel>
                            <Input id="pasport-series" />
                        </FormControl>
                        <FormControl size="small">
                            <InputLabel required htmlFor="pasport-number">Номер</InputLabel>
                            <Input id="pasport-number" />
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="pasport" sx={{ width: '30rem', mt: 2 }}>
                        <InputLabel>Паспорт</InputLabel>
                        <FormControl size="small">
                            <InputLabel required htmlFor="pasport-registration">Адрес регистрации по мест жительства</InputLabel>
                            <Input id="pasport-registration" multiline rows={3} />
                        </FormControl>
                        <FormControl size="small">
                            <InputLabel required htmlFor="pasport-source">Кем выдан</InputLabel>
                            <Input id="pasport-source" multiline rows={3} />
                        </FormControl>
                    </FormGroup>
                </Box>
            </Box>
        </Container>
    );
};

export default UsersCard;
import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, FormHelperText, FormGroup, TextField, Button } from '@mui/material';
// import SplitPane from 'react-split-pane';
import SplitPane, { Pane, SashContent } from 'split-pane-react';

import './UsersRegistry.scss';
import { Stack } from '@mui/system';

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

const UsersRegistry = () => {
    const [sizes, setSizes] = useState([500, '30%', 'auto']);

    return (
        <Container disableGutters className="registry-container" sx={{ ml: '5rem', w: '100vw', }}>
            <Box>
                <Typography variant="h6" align="left">
                    Учётные данные о пользователе
                </Typography>
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

export default UsersRegistry;
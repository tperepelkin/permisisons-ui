import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import DroneIcon from '../../assets/react-svg/DroneIcon';
import LayersIcon from '@mui/icons-material/Layers';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';

export function NavBarMainList() {
    const [openPermissions, setOpenPermissions] = React.useState(false);
    const handlePermisisonsClick = () => {
        setOpenPermissions(!openPermissions);
    };
    const [openActors, setOpenActors] = React.useState(false);
    const handleActorsClick = () => {
        setOpenActors(!openActors);
    };

    return (
        <>
            <ListItemButton onClick={handleActorsClick}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                {openActors ? <ExpandLess /> : <ExpandMore />}
                <ListItemText primary="Реестр пользователей ВП" />
            </ListItemButton>
            <Collapse in={openActors} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AccessibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Физическое лицо" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Организация" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton>
                <ListItemIcon>
                    <AirplanemodeActiveIcon />
                </ListItemIcon>
                <ListItemText primary="Реестр ВС" />
            </ListItemButton>
            <ListItemButton onClick={handlePermisisonsClick}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                {openPermissions ? <ExpandLess /> : <ExpandMore />}
                <ListItemText primary="Реестр разрешений на ИВП" />
            </ListItemButton>
            <Collapse in={openPermissions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="В административных границах города" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="В зонах ограничений" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="В запретных зонах" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton>
                <ListItemIcon>
                    <DroneIcon />
                </ListItemIcon>
                <ListItemText primary="Реестр БВС" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Реестр разрешений на ИВП для БВС" />
            </ListItemButton>
        </>
    )
}

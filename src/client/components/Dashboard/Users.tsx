import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { List, styled } from '@mui/material';
import { EditUserDialog } from './EditUserDialog';

// Generate Order Data
function createData(
  id: number,
  lastName: string,
  firstName: string,
  patronimyc: string,
  passportSeries: number,
  passportNumber: number,
) {
  return { id, lastName, firstName, patronimyc, passportSeries, passportNumber };
}

const rows = [
  createData(
    0,
    'Головкова',
    'Марина',
    'Алексеевна',
    2030,
    231908,
  ),
  createData(
    1,
    'Воронец',
    'Сергей',
    'Васильевич',
    1134,
    531908,
  ),
  createData(
    2,
    'Голосин',
    'Николай',
    'Александрович',
    4030,
    970755,
  ),
  createData(
    3,
    'Голяшов',
    'Евгений',
    'Викторович',
    1230,
    731907,
  ),

  createData(
    4,
    'Иванов',
    'Василий',
    'Иванович',
    1231,
    232908,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const StyledTable = styled(Table)({
  'tbody': {
    'tr': {
      '&:hover': {
        background: '#e9f3fd',
      },
    },
  },
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

 export default function Users() {
  const [open, setOpen] = React.useState(false);

  const handleNavItemClick = (id: number) => {
    console.log('Clicked on id', id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Title>Список зарегистрированных пользователей ВС</Title>
      <StyledTable size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ display: 'none' }}>id</TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell>Серия паспорта</TableCell>
            <TableCell>Номер паспорта</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => handleNavItemClick(row.id)}>
              <TableCell sx={{ display: 'none' }}>{row.id}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.patronimyc}</TableCell>
              <TableCell>{row.passportSeries}</TableCell>
              <TableCell>{row.passportNumber}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Смотреть больше
      </Link>

      <EditUserDialog
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
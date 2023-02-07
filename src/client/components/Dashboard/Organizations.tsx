import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { EditOrganizationDialog } from './EditOrganizationDialog';
import * as moment from 'moment';
import { styled } from '@mui/material';

// Generate Order Data
function createData(
  id: number,
  name: string,
  inn: string,
  ogrn: string,
  ogrnCreateDate: Date
) {
  return { id, name, inn, ogrn, ogrnCreateDate };
}

const rows = [
  createData(
    0,
    'АО "ФК "Зенит"',
    '7812005788',
    '1027810329095',
    moment('20.12.2002', 'YYYY-mm-dd').toDate()
  ),
  createData(
    1,
    'БФ ФНБУ "Иорспасслужба"',
    '7722005788',
    '2222810329095',
    moment('20.12.2020', 'YYYY-mm-dd').toDate()
  ),
  createData(
    2,
    'Войсковая часть 09436',
    '7112235788',
    '1127810329095',
    moment('20.12.1992', 'YYYY-mm-dd').toDate()
  ),
];

const StyledTable = styled(Table)({
  'tbody': {
    'tr': {
      '&:hover': {
        background: '#e9f3fd',
      },
    },
  },
});

export default function Organizations() {
  const [open, setOpen] = React.useState(false);

  const handleNavItemClick = (id: number) => {
    console.log('Clicked on id', id);
    setOpen(true);
  };

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Title>Список организаций</Title>
      <StyledTable size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ display: 'none' }}>id</TableCell>
            <TableCell>Наименование</TableCell>
            <TableCell>ИНН</TableCell>
            <TableCell>ОГРН</TableCell>
            <TableCell>Серия Дата выдачи ОГРН</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => handleNavItemClick(row.id)}>
              <TableCell sx={{ display: 'none' }}>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.inn}</TableCell>
              <TableCell>{row.ogrn}</TableCell>
              <TableCell>{moment(row.ogrnCreateDate).format('dd.mm.YYYY')}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Смотреть больше
      </Link>

      <EditOrganizationDialog
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
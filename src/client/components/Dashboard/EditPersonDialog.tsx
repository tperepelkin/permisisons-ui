import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { Person } from './Users';
import { Organization } from './Organizations';
import { Aircraft } from './Aircrafts';
import { UnmannedAircraft } from './UnmannedAircrafts';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';

export interface EditPersonDialogProps {
  addTitle: string;
  editTitle: string;
  columns: MRT_ColumnDef<Person>[] | MRT_ColumnDef<Organization>[] | MRT_ColumnDef<Aircraft>[] | MRT_ColumnDef<UnmannedAircraft>[];
  onClose: (value: string) => void;
  onSubmit: (values: Person | Organization | Aircraft | UnmannedAircraft) => void;
  editRow: Person | Organization | Aircraft | UnmannedAircraft | null;
  open: boolean;
}

// Если создаём новую запись, то editRow пустая. Когда редактируем, editRow содержит данные строки
export function EditRowDialog(props: EditPersonDialogProps) {
  const { columns, onClose, onSubmit, editRow, open, addTitle, editTitle } = props;
  const [values, setValues] = useState<Person | Organization | Aircraft | UnmannedAircraft | null>(null);

  const dialogTitle = !editRow ? addTitle : editTitle;

  // Однократно вызываем при открытии формы. Инициализируем значения редактируемых полей
  useEffect(() => {
    console.log('EditPersonDialog, editRow changed');
    setValues(editRow);
  }, [editRow]);

  const handleSubmit = () => {
    if (values) {
      onSubmit(values);
    }
    onClose('сохраняем данные');
  };

  return (
    <Dialog
      open={open}
      onClose={(value: string): void => {
        console.log('Dialog onClose, value:', value);
        onClose(value);
      }}
    >
      <DialogTitle textAlign="center">{dialogTitle}</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              pt: '0.5rem',
            }}
          >
            {columns.map(column => {
              if (column.accessorKey === 'registrationDate') {
                const value = values && column.accessorKey ? (values as any)[column.accessorKey] : '';
                console.log('value', value);
                return (
                  <LocalizationProvider
                    key={column.accessorKey}
                    dateAdapter={AdapterDayjs}>
                    {/* <DatePicker
                      key={column.accessorKey}
                      inputFormat="DD/MM/YYYY"
                      value={values && column.accessorKey ? (values as any)[column.accessorKey] : ''}
                      label={column.header}
                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    renderInput={(params) => <TextField {...params} />}
                    /> */}
                    <DatePicker
                      key={column.accessorKey}
                      inputFormat="DD.MM.YYYY"
                      value={value}
                      onChange={(e) => {
                        const value = moment(e.toDate()).format('DD.MM.YYYY');
                        console.log('DatePicker, e:', value , ', values', { ...values, [column.accessorKey]: value, });
                        setValues({ ...values, [column.accessorKey]: value, });
                      }}
                      renderInput={(params) => <TextField {...params} />} />
                  </LocalizationProvider>
                )

              } else {
                return (
                  <TextField
                    key={column.accessorKey}
                    value={values && column.accessorKey ? (values as any)[column.accessorKey] : ''}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                )
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={() => {
          onClose('нажата отмена');
        }}>Отмена</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}

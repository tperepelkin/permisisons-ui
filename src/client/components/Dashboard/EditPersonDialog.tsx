import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { Person } from './Users';
import { Organization } from './Organizations';
import { Aircraft } from './Aircrafts';
import { add } from 'lodash';
import { UnmannedAircraft } from './UnmannedAircrafts';

export interface EditPersonDialogProps {
  addTitle: string;
  editTitle: string;
  columns: MRT_ColumnDef<Person>[] | MRT_ColumnDef<Organization>[] | MRT_ColumnDef<Aircraft>[] | MRT_ColumnDef<UnmannedAircraft>[];
  onClose: (value: string) => void;
  onSubmit: (values: Person | Organization | Aircraft) => void;
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
              return (
                <TextField
                  key={column.accessorKey}
                  value={values && column.accessorKey ? (values as any)[column.accessorKey] : ''}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
              )
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

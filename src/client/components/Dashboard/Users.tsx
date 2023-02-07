import React, { FC, useCallback, useMemo, useState, MouseEvent } from 'react';
import Title from './Title';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, styled, TableContainer, TablePagination, TableSortLabel, TextField, Toolbar, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from "@mui/icons-material/Search";
import MaterialReactTable, { MaterialReactTableProps, MRT_Cell, MRT_ColumnDef, MRT_Row } from 'material-react-table';

import './Users.scss';

interface Person {
  id: number,
  lastName: string,
  firstName: string,
  patronimyc: string,
  passportSeries: number,
  passportNumber: number,
}

// Generate Order Data
function createPerson(
  id: number,
  lastName: string,
  firstName: string,
  patronimyc: string,
  passportSeries: number,
  passportNumber: number,
): Person {
  return { id, lastName, firstName, patronimyc, passportSeries, passportNumber, };
}

const originalRows = [
  createPerson(
    0,
    'Головкова',
    'Марина',
    'Алексеевна',
    2030,
    231908,
  ),
  createPerson(
    1,
    'Воронец',
    'Сергей',
    'Васильевич',
    1134,
    531908,
  ),
  createPerson(
    2,
    'Голосин',
    'Николай',
    'Александрович',
    4030,
    970755,
  ),
  createPerson(
    3,
    'Голяшов',
    'Евгений',
    'Викторович',
    1230,
    731907,
  ),

  createPerson(
    4,
    'Иванов',
    'Василий',
    'Иванович',
    1231,
    232908,
  ),
];

export const CreateNewAccountModal: FC<{
  columns: MRT_ColumnDef<Person>[];
  onClose: () => void;
  onSubmit: (values: Person) => void;
  editRow: Person | null;
  open: boolean;
}> = ({ open, columns, onClose, onSubmit, editRow }) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {} as any),
  );
  console.log('dialog', editRow)
  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  console.log('columns', columns.filter(it => it.accessorKey !== 'id'));
  return (
    <Dialog
      open={open}
    >
      <DialogTitle textAlign="center">Зарегистрировать нового человека</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.filter(it => it.accessorKey !== 'id').map((column) => (
              <TextField
                key={column.accessorKey}
                className={`123`}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Отмена</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;

export default function Users() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Person[]>(() => originalRows);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});
  const [editRow, setEditRow] = useState<Person | null>(null);

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Person>,
    ): MRT_ColumnDef<Person>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = React.useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 4,
        hidden: true,
        invisible: true,
      },
      {
        accessorKey: 'lastName',
        header: 'Фамилия',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'firstName',
        header: 'Имя',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'patronimyc',
        header: 'Отчество',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'passportSeries',
        header: 'Серия паспорта',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'passportNumber',
        header: 'Номер паспорта',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  );

  const handleCreateNewRow = (values: Person) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Person>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        //send/receive api updates here, then refetch or update local table data for re-render
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Person>) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  return (
    <>
      <Title>Список зарегистрированных пользователей ВС</Title>
      <TableContainer>
        <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={originalRows}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Редактировать">
                <IconButton onClick={() => {
                  setEditRow(row);
                  setCreateModalOpen(true);
                }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Удалить">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Box sx={{ width: '150px' }}>
              <Button
                color="primary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                <Tooltip title="Добавить">
                  <AddIcon />
                </Tooltip>
              </Button>
              <Button
                sx={{ ml: '5px' }}
                // onClick={() => setCreateModalOpen(true)}
                variant="outlined"
              >
                <Tooltip title="Обновить">
                  <CachedIcon />
                </Tooltip>
              </Button>
            </Box>
          )}
        />
      </TableContainer>
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        editRow={editRow}
      />
    </>
  );
}
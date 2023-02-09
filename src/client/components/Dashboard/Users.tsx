import React, { useCallback, useState, MouseEvent } from 'react';
import Title from './Title';
import { Box, Button, TableContainer, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import MaterialReactTable, { MaterialReactTableProps, MRT_Cell, MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { EditRowDialog } from './EditPersonDialog';
import { useConfirmDialog } from '../ConfirmDialog/useConfirmDialog';
import { personSampleList, validateRequired } from './sample-data';

import './Users.scss';

export interface Person {
  id: number,
  lastName: string,
  firstName: string,
  patronimyc: string,
  passportSeries: number,
  passportNumber: number,
}

export default function Users() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Person[]>(() => personSampleList);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});
  const [editRow, setEditRow] = useState<Person | null>(null);

  const confirm = useConfirmDialog();

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
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} обязателен`,
            });
          } else {
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
        setTableData([...tableData]);
        exitEditingMode();
      }
    };

  const handleDeleteRow = (row: MRT_Row<Person>) => {
    confirm({
      title: `Вы хотите удалить строку ${row.original.id}?`,
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отменить',
      onConfirm: async () => {
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      }
    });
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  return (
    <>
      <Title>Список зарегистрированных пользователей ВС</Title>
      <TableContainer>
        <MaterialReactTable
          localization={MRT_Localization_RU}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          getRowId={(row) => row.id.toString()}
          editingMode="modal"
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setEditRow(row.original);
              setCreateModalOpen(true);
            },
            sx: { cursor: 'pointer' },
          })}
          renderRowActions={({ row, }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Редактировать">
                <IconButton onClick={() => {
                  setEditRow(row.original);
                  setCreateModalOpen(true);
                }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Удалить">
                <IconButton color="error" onClick={(event: MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleDeleteRow(row);
                }}>
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
      <EditRowDialog
        addTitle="Зарегистрировать пользователя"
        editTitle="Редактировать пользователя"
        columns={columns}
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditRow(null);
        }}
        onSubmit={handleCreateNewRow}
        editRow={editRow}
      />
    </>
  );
}
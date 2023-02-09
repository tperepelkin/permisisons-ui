import React, { useCallback, useState, MouseEvent } from 'react';
import Title from './Title';
import { Box, Button, IconButton, styled, TableContainer, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import MaterialReactTable, { MaterialReactTableProps, MRT_Cell, MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { organizationSampleList, validateRequired } from './sample-data';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import EditIcon from '@mui/icons-material/Edit';
import { useConfirmDialog } from '../ConfirmDialog/useConfirmDialog';
import { EditRowDialog } from './EditPersonDialog';

export interface Organization {
  id: number;
  name: string;
  inn: string;
  ogrn: string;
  ogrnCreateDate: string;
}

export default function Organizations() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Organization[]>(() => organizationSampleList);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});
  const [editRow, setEditRow] = useState<Organization | null>(null);
  const confirm = useConfirmDialog();

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Organization>,
    ): MRT_ColumnDef<Organization>['muiTableBodyCellEditTextFieldProps'] => {
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

  const columns = React.useMemo<MRT_ColumnDef<Organization>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Наименование',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'inn',
        header: 'ИНН',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'ogrn',
        header: 'ОГРН',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'ogrnCreateDate',
        header: 'Дата выдачи ОГРН',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  );

  const handleCreateNewRow = (values: Organization) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Organization>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        setTableData([...tableData]); // Операция по обновлению данных с дальнейшей перерисовкой
        exitEditingMode(); // нужно, чтобы выйти из режима редактиртования и закрыть модальное окно
      }
    };

  const handleDeleteRow = (row: MRT_Row<Organization>) => {
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
      <Title>Список организаций</Title>
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
                // onClickconst confirm = useConfirmDialog();={() => {}}
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
        addTitle="Зарегистрировать организацию"
        editTitle="Редактировать организацию"
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
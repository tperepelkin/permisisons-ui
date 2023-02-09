import React, { useCallback, useState, MouseEvent } from 'react';
import Title from './Title';
import { Box, Button, IconButton, TableContainer, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import MaterialReactTable, { MaterialReactTableProps, MRT_Cell, MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { unmannedAircraftSampleList, validateRequired } from './sample-data';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import EditIcon from '@mui/icons-material/Edit';
import { useConfirmDialog } from '../ConfirmDialog/useConfirmDialog';
import { EditRowDialog } from './EditPersonDialog';

export interface UnmannedAircraft {
  id: number;
  typeName: string;
  serialNumber: string;
  registrationNumber: string;
  owner: string;
  maxTakeoffWeight: number;
  registrationDate: string | null;
}

export default function UnmannedAircrafts() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<UnmannedAircraft[]>(() => unmannedAircraftSampleList);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});
  const [editRow, setEditRow] = useState<UnmannedAircraft | null>(null);
  const confirm = useConfirmDialog();

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<UnmannedAircraft>,
    ): MRT_ColumnDef<UnmannedAircraft>['muiTableBodyCellEditTextFieldProps'] => {
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

  const columns = React.useMemo<MRT_ColumnDef<UnmannedAircraft>[]>(
    () => [
      {
        accessorKey: 'typeName',
        header: 'Тип БВС',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'serialNumber',
        header: 'Серийный номер',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'registrationNumber',
        header: 'Учётный номер',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'owner',
        header: 'Владелец БВС',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'maxTakeoffWeight',
        header: 'Максимальная взлётная масса',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'registrationDate',
        header: 'Дата постановки на учёт',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ cell }) => {
          const value = cell.getValue()?.toString() ?? 'нет';
          return value;
        }
      },

    ],
    [getCommonEditTextFieldProps],
  );

  const handleCreateNewRow = (values: UnmannedAircraft) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<UnmannedAircraft>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        setTableData([...tableData]); // Операция по обновлению данных с дальнейшей перерисовкой
        exitEditingMode(); // нужно, чтобы выйти из режима редактиртования и закрыть модальное окно
      }
    };

  const handleDeleteRow = (row: MRT_Row<UnmannedAircraft>) => {
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
      <Title>Список беспилотных воздушных судов</Title>
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
        addTitle="Зарегистрировать беспилотное воздушное судно"
        editTitle="Редактировать беспилотное воздушное судно"
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
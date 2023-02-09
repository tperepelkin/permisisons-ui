import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UsersCard from '../../../pages/tables/UserCard';

export interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
}

export function EditUserDialog(props: EditUserDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <DialogTitle>Учётные данные пользователя</DialogTitle>
      <DialogContent sx={{ overflowX: 'hidden', }}>
        <UsersCard />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} autoFocus>Отменить</Button>
        <Button variant="outlined" onClick={handleClose}>Сохранить</Button>
        <Button variant="outlined" sx={{ fontSize: '12px' }}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
}

import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import OrganizationCard from '../../pages/tables/OrganizationCard';

export interface EditOrganizationDialogProps {
  open: boolean;
  onClose: () => void;
}

export function EditOrganizationDialog(props: EditOrganizationDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <DialogTitle>Учётные данные организации</DialogTitle>
      <DialogContent sx={{ overflowX: 'hidden', }}>
        <OrganizationCard />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} autoFocus>Отменить</Button>
        <Button variant="outlined" onClick={handleClose}>Сохранить</Button>
        <Button variant="outlined" sx={{ fontSize: '12px' }}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
}

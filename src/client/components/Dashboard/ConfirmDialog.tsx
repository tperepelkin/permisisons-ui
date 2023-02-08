import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

export interface ConfirmDialogProps {
  confirmTitle: string;
  confirmMessage: string;
  onSubmit: () => void;
  onClose: (value: string) => void;
}

export function ConfirmDialogOld(props: ConfirmDialogProps) {
  const { confirmTitle, confirmMessage, onSubmit, onClose } = props;

  return (
    <Dialog open={Boolean(onSubmit)} onClose={onClose} maxWidth="sm" fullWidth>
      {confirmTitle && <DialogTitle>{confirmTitle}</DialogTitle>}
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton> 
      </Box>
      <DialogContent>
        <Typography>{confirmMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => onClose('')}>
          Отменить
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            onClose('');
          }}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React from 'react';
import { ConfirmContext } from './ConfirmDialogProvider';

export const useConfirmDialog = () => {
  const confirm = React.useContext(ConfirmContext);

  if (!confirm) throw new Error('useConfirmDialog должен использоваться в контексте ConfirmDialogProvider');

  return confirm;
};
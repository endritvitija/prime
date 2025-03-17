import i18n from '@/i18n/i18n';
import { Chip } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const colorMap = {
  IN_PROGRESS: 'info',
  DONE: 'success',
  TODO: 'warning',
};

function ProjectStatusChip({ status }) {
  const { t } = useTranslation();

  const displayNameMap = useMemo(
    () => ({
      IN_PROGRESS: i18n.t('status.inProgress'),
      DONE: i18n.t('status.done'),
      TODO: i18n.t('status.toDo'),
    }),
    [t],
  );

  return (
    <Chip label={displayNameMap[status] ?? ''} size='small' color={colorMap[status] ?? 'default'} />
  );
}

export default ProjectStatusChip;

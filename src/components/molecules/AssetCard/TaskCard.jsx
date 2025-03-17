import { Stack, Typography } from '@mui/material';
import AssetContainer from './AssetContainer';
import { TaskAlt } from '@mui/icons-material';
import ProjectStatusChip from './ProjectStatusChip';
import { useTranslation } from 'react-i18next';

function TaskCard({ task, onDelete }) {
  const { t } = useTranslation();

  return (
    <AssetContainer asset={task} icon={<TaskAlt />} onDelete={onDelete}>
      <Stack justifyContent='space-between' className='w-full h-full'>
        <Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='body2' noWrap fontWeight={600}>
              {t('assignee')}:
            </Typography>
            <Typography variant='body2' noWrap>
              {task.assignee.name}
            </Typography>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='body2' noWrap fontWeight={600}>
              {t('reporter')}:
            </Typography>
            <Typography variant='body2' noWrap>
              {task.reporter.name}
            </Typography>
          </Stack>
        </Stack>

        <Stack alignItems='end'>
          <ProjectStatusChip status={task.status} />
        </Stack>
      </Stack>
    </AssetContainer>
  );
}

export default TaskCard;

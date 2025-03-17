import { FolderOpen } from '@mui/icons-material';
import { Stack, Typography, useTheme } from '@mui/material';

const EmptyContent = ({ icon, primaryText, secondaryText, button }) => {
  const theme = useTheme();

  return (
    <Stack className='w-full h-full' justifyContent='center' alignItems='center' spacing={2}>
      {icon || <FolderOpen sx={{ fontSize: '8rem', color: '#cccccc' }} />}

      <Stack alignItems='center'>
        <Typography variant='body1'>{primaryText}</Typography>

        <Typography variant='body2' color={theme.palette.text.secondary}>
          {secondaryText}
        </Typography>
      </Stack>

      {button}
    </Stack>
  );
};

export default EmptyContent;

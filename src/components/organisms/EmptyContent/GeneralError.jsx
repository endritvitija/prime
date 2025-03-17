import EmptyContent from '@/components/organisms/EmptyContent/EmptyContent';
import { Error, Refresh } from '@mui/icons-material';
import { Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const GeneralError = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className='w-full h-full'>
      <EmptyContent
        icon={
          <Error
            className='text-9xl'
            sx={{
              color: theme.palette.text.secondary,
            }}
          />
        }
        primaryText={t('errors.general')}
        secondaryText={`${t('errors.refreshAndTryAgain')}!`}
        button={
          <Button variant='contained' startIcon={<Refresh />} onClick={refreshPage}>
            {t('refresh')}
          </Button>
        }
      />
    </div>
  );
};

export default GeneralError;

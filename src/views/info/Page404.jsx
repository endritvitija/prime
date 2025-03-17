import { Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@mui/icons-material';
import EmptyContent from '@/components/organisms/EmptyContent/EmptyContent';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div className='h-screen w-screen'>
      <EmptyContent
        icon={
          <Typography variant='h1' fontWeight='bold' color={theme.palette.text.secondary}>
            404
          </Typography>
        }
        primaryText={t('errors.404')}
        secondaryText={t('errors.pageNotFound')}
        button={
          <Link to='/'>
            <Button variant='contained' startIcon={<HomeOutlined />}>
              {t('goHome')}
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default Page404;

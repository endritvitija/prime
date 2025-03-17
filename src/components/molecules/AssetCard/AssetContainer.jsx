import { AttachFile, Delete, Star } from '@mui/icons-material';
import { Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

function AssetContainer({ asset, icon, children, className, onDelete }) {
  const rootClassName = clsx(className, 'w-full h-48');

  const [isFavorite, setIsFavorite] = useState(false);

  const onFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card
      className={rootClassName}
      sx={{
        backgroundImage: 'none',
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: 'divider',
        }}
        className='overflow-hidden'
        avatar={icon || <AttachFile />}
        title={
          <Typography variant='body2' noWrap className='w-5/6'>
            {asset.name}
          </Typography>
        }
        action={
          <Stack flexDirection='row'>
            <IconButton color={isFavorite ? 'primary' : 'default'} onClick={onFavorite}>
              <Star />
            </IconButton>
            <IconButton onClick={onDelete}>
              <Delete />
            </IconButton>
          </Stack>
        }
      />
      <CardContent className='w-full h-[calc(100%-3.5rem)]'>{children}</CardContent>
    </Card>
  );
}

export default AssetContainer;

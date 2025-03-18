import {
  CardActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import AssetContainer from './AssetContainer';
import { Note as NoteIcon, OpenInFull } from '@mui/icons-material';
import DisappearingOverlay from '@/components/atoms/DisappearingOverlay/DisappearingOverlay';
import { useState } from 'react';

function NoteCard({ note, onDelete, isFavorite, onFavorite }) {
  const theme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <AssetContainer 
        asset={note} 
        icon={<NoteIcon />} 
        onDelete={onDelete}
        isFavorite={isFavorite}
        onFavorite={onFavorite}
      >
        <Stack justifyContent='space-between' className='h-full relative'>
          <Typography variant='body2' overflow='hidden'>
            {note.text}
          </Typography>

          <DisappearingOverlay color={theme.palette.background.paper} />

          <CardActions className='p-0 mb-[-1rem]'>
            <IconButton className='ml-auto' color='info' onClick={() => setIsDialogOpen(true)}>
              <OpenInFull />
            </IconButton>
          </CardActions>
        </Stack>
      </AssetContainer>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} scroll='paper'>
        <DialogTitle>{note.name}</DialogTitle>

        <DialogContent dividers={true}>
          <DialogContentText>{note.text}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NoteCard;

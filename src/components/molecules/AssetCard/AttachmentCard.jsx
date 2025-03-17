import { Link, Stack } from '@mui/material';
import AssetContainer from './AssetContainer';

function AttachmentCard({ attachment, onDelete }) {
  return (
    <AssetContainer asset={attachment} onDelete={onDelete}>
      <Stack spacing={2}>
        <Link href={attachment.url} target='_blank' rel='noreferrer' variant='body2'>
          {attachment.url}
        </Link>
      </Stack>
    </AssetContainer>
  );
}

export default AttachmentCard;

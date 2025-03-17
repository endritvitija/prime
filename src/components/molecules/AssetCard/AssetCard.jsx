import NoteCard from './NoteCard';
import TaskCard from './TaskCard';
import AttachmentCard from './AttachmentCard';

function getAssetType(asset, onDelete) {
  switch (asset.type) {
    case 'note':
      return <NoteCard note={asset} onDelete={onDelete} />;
    case 'task':
      return <TaskCard task={asset} onDelete={onDelete} />;
    case 'attachment':
      return <AttachmentCard attachment={asset} onDelete={onDelete} />;
    default:
      return <></>;
  }
}

function AssetCard({ asset, onDelete }) {
  return getAssetType(asset, onDelete);
}

export default AssetCard;

import NoteCard from './NoteCard';
import TaskCard from './TaskCard';
import AttachmentCard from './AttachmentCard';

function getAssetType(asset, onDelete, isFavorite, onFavorite) {
  switch (asset.type) {
    case 'note':
      return (
        <NoteCard
          note={asset}
          onDelete={onDelete}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      );
    case 'task':
      return (
        <TaskCard
          task={asset}
          onDelete={onDelete}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      );
    case 'attachment':
      return (
        <AttachmentCard
          attachment={asset}
          onDelete={onDelete}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      );
    default:
      return <></>;
  }
}

function AssetCard({ asset, onDelete, isFavorite, onFavorite }) {
  return getAssetType(asset, onDelete, isFavorite, onFavorite);
}

export default AssetCard;

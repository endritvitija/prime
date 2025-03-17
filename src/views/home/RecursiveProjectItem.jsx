import CustomTreeItem from '@/components/atoms/TreeItem/CustomTreeItem';
import { useTranslation } from 'react-i18next';

export const emptyPrefix = 'empty-';
export const loadingPrefix = 'loading-';

function RecursiveTreeItem({
  project,
  childrenMap,
  disabled,
}) {
  const { t } = useTranslation();
  const myChildren = childrenMap[project.id];

  return (
    <CustomTreeItem nodeId={project.id} label={project.name} disabled={disabled}>
      {myChildren ? (
        myChildren.length > 0 ? (
          myChildren.map((child) => (
            <RecursiveTreeItem
              key={child.id}
              project={child}
              childrenMap={childrenMap}
              disabled={disabled}
            />
          ))
        ) : (
          <CustomTreeItem
            key='empty'
            nodeId={`${emptyPrefix}${project.id}`}
            label={t('noProjects')}
            disabled={disabled}
          />
        )
      ) : (
        <CustomTreeItem
          key='loading'
          nodeId={`${loadingPrefix}${project.id}`}
          label={t('loadingProjects')}
          disabled={disabled}
        />
      )}
    </CustomTreeItem>
  );
}

export default RecursiveTreeItem;

import { TreeItem } from '@mui/x-tree-view';
import React from 'react';
import CustomContent from './CustomContent';

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props,
  ref,
) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

export default CustomTreeItem;

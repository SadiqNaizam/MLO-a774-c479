import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';

export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file' as const;
  children?: TreeNode[];
}

interface TreeViewItemProps {
  node: TreeNode;
  level: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
  highlightText: (text: string) => React.ReactNode;
}

export const TreeViewItem: React.FC<TreeViewItemProps> = ({
  node,
  level,
  isOpen,
  isSelected,
  onToggle,
  onSelect,
  highlightText,
}) => {
  const indentStyle = { paddingLeft: `${level * 1.5}rem` }; // 1.5rem per level (24px)

  const handleItemClick = () => {
    onSelect();
    if (node.type === 'folder') {
      onToggle();
    }
  };

  return (
    <div
      className={cn(
        'flex items-center py-1.5 px-2 cursor-pointer rounded-md',
        'hover:bg-muted',
        isSelected && 'bg-accent text-accent-foreground hover:bg-accent/90',
      )}
      style={indentStyle}
      onClick={handleItemClick}
    >
      {node.type === 'folder' ? (
        <button
          onClick={(e) => { 
            e.stopPropagation(); // Prevent item click from firing again
            onToggle(); 
          }}
          className="mr-1 p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
          aria-label={isOpen ? 'Collapse folder' : 'Expand folder'}
        >
          {isOpen ? (
            <ChevronDown size={16} className="text-muted-foreground" />
          ) : (
            <ChevronRight size={16} className="text-muted-foreground" />
          )}
        </button>
      ) : (
        <span className="w-[20px] mr-1"></span> // Placeholder for non-folder items to align text
      )}

      {node.type === 'folder' ? (
        <Folder size={16} className={cn('mr-2 flex-shrink-0', isSelected ? 'text-accent-foreground' : 'text-primary')} />
      ) : (
        <FileText size={16} className={cn('mr-2 flex-shrink-0', isSelected ? 'text-accent-foreground' : 'text-muted-foreground')} />
      )}

      <span className="truncate">
        {highlightText(node.name)}
      </span>
    </div>
  );
};

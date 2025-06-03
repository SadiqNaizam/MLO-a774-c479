import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TreeViewItem, TreeNode } from './TreeViewItem';
import { SearchBox } from '../Search/SearchBox';

// Define the TreeNode interface if not already defined in TreeViewItem.tsx or a shared types file
// For this example, assuming it's also needed here or re-exported by TreeViewItem if defined there.
// export interface TreeNode {
//   id: string;
//   name: string;
//   type: 'folder' | 'file' as const;
//   children?: TreeNode[];
// }

const initialTreeData: TreeNode[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder' as const,
    children: [
      {
        id: '1-1',
        name: 'Work',
        type: 'folder' as const,
        children: [
          { id: '1-1-1', name: 'ProjectProposal.docx', type: 'file' as const },
          { id: '1-1-2', name: 'MeetingNotes.txt', type: 'file' as const },
          {
            id: '1-1-3',
            name: 'Archive',
            type: 'folder' as const,
            children: [
              { id: '1-1-3-1', name: 'OldContract.pdf', type: 'file' as const },
            ]
          },
        ],
      },
      {
        id: '1-2',
        name: 'Personal',
        type: 'folder' as const,
        children: [
          { id: '1-2-1', name: 'VacationPhotos.jpg', type: 'file' as const },
          { id: '1-2-2', name: 'TaxReturn_2023.pdf', type: 'file' as const },
        ],
      },
      { id: '1-3', name: 'Invoices.pdf', type: 'file' as const },
    ],
  },
  {
    id: '2',
    name: 'Pictures',
    type: 'folder' as const,
    children: [
      { id: '2-1', name: 'Barcelona.jpg', type: 'file' as const },
      { id: '2-2', name: 'Paris.jpg', type: 'file' as const },
      {
        id: '2-3',
        name: 'Family',
        type: 'folder' as const,
        children: [
          { id: '2-3-1', name: 'Christmas2023.png', type: 'file' as const },
          { id: '2-3-2', name: 'BirthdayParty.mov', type: 'file' as const },
        ]
      }
    ],
  },
  { id: '3', name: 'Music', type: 'folder' as const, children: [] }, // Empty folder
  { id: '4', name: 'Application.exe', type: 'file' as const },
];

interface TreeViewProps {
  initialData?: TreeNode[];
  className?: string;
}

const TreeView: React.FC<TreeViewProps> = ({
  initialData = initialTreeData,
  className,
}) => {
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set(['1', '1-1'])); // Default open some nodes
  const [selectedNode, setSelectedNode] = useState<{ id: string; type: TreeNode['type'] } | null>(null);
  const [rootSearchTerm, setRootSearchTerm] = useState<string>('');
  const [nestedSearchTerms, setNestedSearchTerms] = useState<Record<string, string>>({});

  const handleToggle = useCallback((nodeId: string) => {
    setOpenNodes(prev => {
      const newOpenNodes = new Set(prev);
      if (newOpenNodes.has(nodeId)) {
        newOpenNodes.delete(nodeId);
      } else {
        newOpenNodes.add(nodeId);
      }
      return newOpenNodes;
    });
  }, []);

  const handleSelect = useCallback((nodeId: string, nodeType: TreeNode['type']) => {
    setSelectedNode({ id: nodeId, type: nodeType });
  }, []);

  const highlightMatch = useCallback((text: string, term: string): React.ReactNode => {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="bg-yellow-200 text-black rounded-sm px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }, []);

  const filterNodes = useCallback((nodes: TreeNode[], term: string): TreeNode[] => {
    if (!term) return nodes;
    return nodes.reduce<TreeNode[]>((acc, node) => {
      const nodeNameMatches = node.name.toLowerCase().includes(term.toLowerCase());
      if (node.type === 'folder' && node.children) {
        const filteredChildren = filterNodes(node.children, term);
        if (nodeNameMatches || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
      } else if (node.type === 'file' && nodeNameMatches) {
        acc.push(node);
      }
      return acc;
    }, []);
  }, []);

  const renderTreeNodes = (nodes: TreeNode[], level: number, parentId?: string): React.ReactNode => {
    const currentLevelNodes = parentId && nestedSearchTerms[parentId]
      ? filterNodes(nodes, nestedSearchTerms[parentId])
      : nodes;

    return currentLevelNodes.map(node => {
      const isOpen = openNodes.has(node.id);
      const isSelected = selectedNode?.id === node.id;
      
      const termForHighlightingThisNode = (parentId && nestedSearchTerms[parentId]) 
                                          ? nestedSearchTerms[parentId] 
                                          : rootSearchTerm;

      return (
        <React.Fragment key={node.id}>
          <TreeViewItem
            node={node}
            level={level}
            isOpen={isOpen}
            isSelected={isSelected}
            onToggle={() => handleToggle(node.id)}
            onSelect={() => handleSelect(node.id, node.type)}
            highlightText={text => highlightMatch(text, termForHighlightingThisNode)}
          />
          {node.type === 'folder' && isOpen && node.children && (
            <>
              <div style={{ paddingLeft: `${(level + 1) * 1.5 + 0.5}rem` }} className="pr-2 py-1">
                <SearchBox
                  placeholder={`Search in ${node.name}...`}
                  value={nestedSearchTerms[node.id] || ''}
                  onChange={(e) => {
                    const newSearchTerm = e.target.value;
                    setNestedSearchTerms(prev => ({ ...prev, [node.id]: newSearchTerm }));
                  }}
                  className="my-1 h-8 text-sm"
                />
              </div>
              {renderTreeNodes(node.children, level + 1, node.id)}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  const globallyFilteredData = filterNodes(initialData, rootSearchTerm);

  return (
    <div className={cn("w-full text-sm", className)}>
      <SearchBox
        placeholder="Filtered Tree View: Search..."
        value={rootSearchTerm}
        onChange={(e) => setRootSearchTerm(e.target.value)}
        className="mb-2 h-10"
      />
      {renderTreeNodes(globallyFilteredData, 0)}
      {selectedNode && (
         <div className="mt-4 p-2 border rounded bg-muted">
            <p className="text-xs text-muted-foreground">Selection:</p>
            <p>ID: {selectedNode.id}, Type: {selectedNode.type}</p>
        </div>
      )}
    </div>
  );
};

export default TreeView;

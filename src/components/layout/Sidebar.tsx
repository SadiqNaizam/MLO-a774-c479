import React from 'react';
import { cn } from '@/lib/utils';
import { Blocks, ChevronRight, SlidersHorizontal, CheckSquare, ListRadio, Tags, ToggleRight, ImageIcon, Link as LinkIcon, Type, Pilcrow, Minus, MessageSquare, FolderTree } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  current?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, current }) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        current ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/80'
      )}
    >
      <Icon size={18} className="mr-3 flex-shrink-0" />
      {label}
    </a>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const navigationItems = [
    { label: 'Tree View Manager', href: '#', icon: FolderTree, current: true },
    { label: 'Buttons', href: '#', icon: ChevronRight },
    { label: 'Slider', href: '#', icon: SlidersHorizontal },
    { label: 'Checkbox', href: '#', icon: CheckSquare },
    { label: 'Radio-Button', href: '#', icon: ListRadio },
    { label: 'Tags', href: '#', icon: Tags },
    { label: 'Toggle', href: '#', icon: ToggleRight },
    { label: 'Icons', href: '#', icon: ImageIcon },
    { label: 'Action Links', href: '#', icon: LinkIcon },
    { label: 'Input', href: '#', icon: Type }, // Using 'Type' for generic input representation
    { label: 'Typography', href: '#', icon: Pilcrow },
    { label: 'Dividers', href: '#', icon: Minus },
    { label: 'Tooltip', href: '#', icon: MessageSquare },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 flex flex-col',
        'w-56 h-screen',
        'bg-sidebar text-sidebar-foreground',
        'border-r border-sidebar-border',
        className
      )}
    >
      <div className="flex items-center h-[64px] px-4 border-b border-sidebar-border">
        <Blocks size={24} className="mr-2 text-sidebar-primary" />
        <h1 className="text-xl font-semibold text-sidebar-foreground">Ava-Play</h1>
      </div>
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

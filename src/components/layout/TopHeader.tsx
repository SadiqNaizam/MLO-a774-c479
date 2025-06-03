import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { 
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

interface TopHeaderProps {
  className?: string;
  onMenuToggle?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onMenuToggle }) => {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-10 flex items-center justify-between',
        'h-[64px] px-6',
        'bg-foreground text-primary-foreground',
        'border-b border-border',
        className
      )}
      style={{ left: '14rem' }} // 14rem is w-56 from sidebar
    >
      <div className="flex items-center">
        {onMenuToggle && (
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="mr-4 hover:bg-white/10">
            <Menu size={20} />
          </Button>
        )}
        <h2 className="text-lg font-medium">Tree View Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* UserProfile: Simplified to Avatar. DropdownMenu can be added here. */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
          <AvatarFallback><UserCircle size={20}/></AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopHeader;

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // placeholder is already part of InputHTMLAttributes
  // value is already part of InputHTMLAttributes
  // onChange is already part of InputHTMLAttributes
  containerClassName?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={cn('relative w-full', containerClassName)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn('pl-10', className)} // Add padding for the icon
        {...props}
      />
    </div>
  );
};

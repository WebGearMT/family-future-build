import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

export interface BrandProps {
  className?: string;
}

const Brand: React.FC<BrandProps> = ({ className }) => {
  return (
    <div className="flex items-center">
        <Link
        to="/"
        className={cn(
            'brand flex items-center transition duration-300 ease-in-out transform hover:scale-110',
            className
        )}
        >
            <img
                src="/images/logo.jpeg"
                alt="Gotta Be NC Logo"
                className="h-10 w-auto mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900">
                GOTTA BE NC
            </h1>
        </Link>
    </div>
  );
};

export { Brand };
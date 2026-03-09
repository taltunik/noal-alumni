import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl bg-card border border-border p-6 shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-primary/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import React from 'react';

interface RelativeTimeProps {
  datetime: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export const RelativeTime: React.FC<RelativeTimeProps> = ({ 
  datetime, 
  className, 
  title, 
  children 
}) => {
  return (
    <span className={className} title={title}>
      {children || formatRelativeTime(datetime)}
    </span>
  );
};

function formatRelativeTime(datetime: string): string {
  const date = new Date(datetime);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) {
    return 'last month';
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}
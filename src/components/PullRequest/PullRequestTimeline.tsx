import React from 'react';
import { TimelineEvent, User } from './types';
import { RelativeTime } from './RelativeTime';

interface PullRequestTimelineProps {
  event: TimelineEvent;
}

export const PullRequestTimeline: React.FC<PullRequestTimelineProps> = ({ event }) => {
  const { type, actor, createdAt, content } = event;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderIcon = () => {
    switch (type) {
      case 'commit':
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-gray-600 dark:text-gray-400">
            <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
          </svg>
        );
      case 'review':
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-gray-600 dark:text-gray-400">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
          </svg>
        );
      case 'merge':
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-purple-600 dark:text-purple-400">
            <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"></path>
          </svg>
        );
      case 'label':
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-gray-600 dark:text-gray-400">
            <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"></path>
          </svg>
        );
      case 'deploy':
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-gray-600 dark:text-gray-400">
            <path d="M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.752 8.752 0 0 1-2.564 6.186l-.458.459c-.314.314-.641.616-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.749.749 0 0 1-1.11-.418l-.954-3.102a1.214 1.214 0 0 1-.145-.125L3.754 9.816a1.218 1.218 0 0 1-.124-.145L.528 8.717a.749.749 0 0 1-.418-1.11l1.71-2.774A1.748 1.748 0 0 1 3.31 4h3.204c.288-.338.59-.665.904-.979l.459-.458A8.749 8.749 0 0 1 14.064 0Z"></path>
          </svg>
        );
      case 'rename':
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-gray-600 dark:text-gray-400">
            <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
          </svg>
        );
      default:
        return (
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="text-gray-600 dark:text-gray-400">
            <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"></path>
          </svg>
        );
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'commit':
        return (
          <div className="flex items-center">
            <a href={content.url} className="text-gray-700 dark:text-gray-300 font-mono text-sm">
              {content.oid.substring(0, 7)}
            </a>
            <span className="ml-2 text-gray-700 dark:text-gray-300">{content.message}</span>
          </div>
        );
      case 'review':
        return (
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {content.state === 'APPROVED' ? 'approved these changes' : 
               content.state === 'CHANGES_REQUESTED' ? 'requested changes' : 
               'reviewed'}
            </span>
          </div>
        );
      case 'merge':
        return (
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">merged this pull request</span>
          </div>
        );
      case 'rename':
        return (
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">changed the title from </span>
            <span className="mx-1 font-semibold line-through dark:text-gray-300">{content.from}</span>
            <span className="text-gray-700 dark:text-gray-300">to</span>
            <span className="mx-1 font-semibold dark:text-gray-300">{content.to}</span>
          </div>
        );
      case 'deploy':
        return (
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">deployed to </span>
            <a href={content.url} className="ml-1 text-blue-600 dark:text-blue-400 hover:underline">
              {content.environment}
            </a>
          </div>
        );
      default:
        return <span className="text-gray-700 dark:text-gray-300">performed an action</span>;
    }
  };

  return (
    <div className="flex items-start py-2">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 mr-3">
        {renderIcon()}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center">
          {actor && (
            <a href={actor.url} className="flex-shrink-0 mr-1">
              <img 
                src={actor.avatarUrl} 
                alt={actor.login} 
                className="w-5 h-5 rounded-full"
              />
            </a>
          )}
          {actor && (
            <a href={actor.url} className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 mr-1">
              {actor.login}
            </a>
          )}
          {renderContent()}
          <div className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
            <RelativeTime datetime={createdAt} title={formatDate(createdAt)} />
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { PullRequest } from './types';

interface PullRequestTabsProps {
  pullRequest: PullRequest;
  activeTab: 'conversation' | 'commits' | 'checks' | 'files';
  onTabChange: (tab: 'conversation' | 'commits' | 'checks' | 'files') => void;
}

export const PullRequestTabs: React.FC<PullRequestTabsProps> = ({ 
  pullRequest, 
  activeTab, 
  onTabChange 
}) => {
  const { comments, reviews, timelineEvents } = pullRequest;
  const conversationCount = comments.length + reviews.length;
  const commitsCount = timelineEvents.filter(event => event.type === 'commit').length;
  const checksCount = 5; 
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
      <div className="hidden md:block float-right text-sm text-gray-600 dark:text-gray-400">
        <span className="inline-flex items-center">
          <span className="text-green-600 dark:text-green-400 font-medium">
            +{pullRequest.additions}
          </span>
          <span className="text-red-600 dark:text-red-400 font-medium ml-1">
            −{pullRequest.deletions}
          </span>
          <span className="ml-2 inline-flex">
            <span className="w-2 h-2 bg-green-500 rounded-sm"></span>
            <span className="w-2 h-2 bg-red-500 rounded-sm"></span>
            <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-sm"></span>
            <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-sm"></span>
            <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-sm"></span>
          </span>
        </span>
      </div>

      <nav className="flex overflow-x-auto">
        <button 
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'conversation' 
              ? 'border-orange-500 text-gray-900 dark:text-gray-100' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
          onClick={() => onTabChange('conversation')}
        >
          <div className="flex items-center">
            <svg className="hidden md:block mr-2 h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z"></path>
            </svg>
            Conversation
            {conversationCount > 0 && (
              <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                {conversationCount}
              </span>
            )}
          </div>
        </button>

        <button 
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'commits' 
              ? 'border-orange-500 text-gray-900 dark:text-gray-100' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
          onClick={() => onTabChange('commits')}
        >
          <div className="flex items-center">
            <svg className="hidden md:block mr-2 h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
            </svg>
            Commits
            {commitsCount > 0 && (
              <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                {commitsCount}
              </span>
            )}
          </div>
        </button>

        <button 
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'checks' 
              ? 'border-orange-500 text-gray-900 dark:text-gray-100' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
          onClick={() => onTabChange('checks')}
        >
          <div className="flex items-center">
            <svg className="hidden md:block mr-2 h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 0 1-1.5 0V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13.274 9.537v-.001l-4.557 4.45a.75.75 0 0 1-1.055-.008l-1.943-1.95a.75.75 0 0 1 1.062-1.058l1.419 1.425 4.026-3.932a.75.75 0 1 1 1.048 1.074ZM4.75 4h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM4 7.75A.75.75 0 0 1 4.75 7h2a.75.75 0 0 1 0 1.5h-2A.75.75 0 0 1 4 7.75Z"></path>
            </svg>
            Checks
            {checksCount > 0 && (
              <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                {checksCount}
              </span>
            )}
          </div>
        </button>

        <button 
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'files' 
              ? 'border-orange-500 text-gray-900 dark:text-gray-100' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
          onClick={() => onTabChange('files')}
        >
          <div className="flex items-center">
            <svg className="hidden md:block mr-2 h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 1.75C1 .784 1.784 0 2.75 0h7.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073ZM8 3.25a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0V7h-1.5a.75.75 0 0 1 0-1.5h1.5V4A.75.75 0 0 1 8 3.25Zm-3 8a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"></path>
            </svg>
            Files changed
            {pullRequest.changedFiles > 0 && (
              <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                {pullRequest.changedFiles}
              </span>
            )}
          </div>
        </button>
      </nav>
    </div>
  );
};
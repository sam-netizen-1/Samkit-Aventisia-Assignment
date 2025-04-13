import React from 'react';
import { PullRequest, User, Label } from './types';

interface PullRequestSidebarProps {
  pullRequest: PullRequest;
}

export const PullRequestSidebar: React.FC<PullRequestSidebarProps> = ({ pullRequest }) => {
  const { reviewers, assignees, labels } = pullRequest;

  const renderReviewers = () => {
    if (reviewers.length === 0) {
      return <span className="text-gray-500 dark:text-gray-400">No reviewers</span>;
    }

    return (
      <div className="space-y-2">
        {reviewers.map((reviewer) => (
          <div key={reviewer.id} className="flex items-center">
            <a href={reviewer.url} className="flex items-center group">
              <img 
                src={reviewer.avatarUrl} 
                alt={reviewer.login} 
                className="w-5 h-5 rounded-full mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {reviewer.login}
              </span>
            </a>
            <div className="ml-auto">
              <span className="flex items-center justify-center w-5 h-5 text-green-600 dark:text-green-400">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAssignees = () => {
    if (assignees.length === 0) {
      return <span className="text-gray-500 dark:text-gray-400">No one assigned</span>;
    }

    return (
      <div className="space-y-2">
        {assignees.map((assignee) => (
          <div key={assignee.id} className="flex items-center">
            <a href={assignee.url} className="flex items-center group">
              <img 
                src={assignee.avatarUrl} 
                alt={assignee.login} 
                className="w-5 h-5 rounded-full mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {assignee.login}
              </span>
            </a>
          </div>
        ))}
      </div>
    );
  };

  const renderLabels = () => {
    if (labels.length === 0) {
      return <span className="text-gray-500 dark:text-gray-400">None yet</span>;
    }

    return (
      <div className="flex flex-wrap gap-1">
        {labels.map((label) => {
          const backgroundColor = `#${label.color}`;
          const textColor = getContrastColor(backgroundColor);
          
          return (
            <a 
              key={label.id} 
              href="#" 
              className="px-2 py-0.5 text-xs font-medium rounded-full"
              style={{ backgroundColor, color: textColor }}
            >
              {label.name}
            </a>
          );
        })}
      </div>
    );
  };

  const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const renderParticipants = () => {
    const allParticipants = [
      pullRequest.author,
      ...reviewers,
      ...assignees
    ];
    
    const uniqueParticipants = allParticipants.filter(
      (participant, index, self) => 
        index === self.findIndex(p => p.id === participant.id)
    );
    
    return (
      <div className="flex flex-wrap">
        {uniqueParticipants.map((participant) => (
          <a 
            key={participant.id} 
            href={participant.url}
            className="mr-1 mb-1"
            title={participant.login}
          >
            <img 
              src={participant.avatarUrl} 
              alt={participant.login} 
              className="w-7 h-7 rounded-full border border-white dark:border-gray-800 hover:opacity-80"
            />
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reviewers</h3>
        {renderReviewers()}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignees</h3>
        {renderAssignees()}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Labels</h3>
        {renderLabels()}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Projects</h3>
        <span className="text-gray-500 dark:text-gray-400">None yet</span>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Milestone</h3>
        <span className="text-gray-500 dark:text-gray-400">No milestone</span>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Development</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Successfully merging this pull request may close these issues.
        </p>
        <span className="text-gray-500 dark:text-gray-400">None yet</span>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">4 participants</h3>
        {renderParticipants()}
      </div>
    </div>
  );
};
import React from 'react';
import { Comment, User } from './types';
import { RelativeTime } from './RelativeTime';

interface PullRequestCommentProps {
  comment: Comment;
  isMinimized?: boolean;
}

export const PullRequestComment: React.FC<PullRequestCommentProps> = ({ 
  comment, 
  isMinimized = false 
}) => {
  const { author, createdAt, body, reactions } = comment;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderReactions = () => {
    if (!reactions || reactions.totalCount === 0) return null;
    
    return (
      <div className="mt-2 flex flex-wrap">
        {reactions.types.map((reaction) => (
          <button 
            key={reaction.type}
            className="mr-2 mb-2 flex items-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full px-2 py-1 text-sm disabled:opacity-75"
            disabled
          >
            <span className="mr-1">{getEmojiForReaction(reaction.type)}</span>
            <span>{reaction.count}</span>
          </button>
        ))}
      </div>
    );
  };

  const getEmojiForReaction = (type: string): string => {
    switch (type) {
      case 'THUMBS_UP': return '👍';
      case 'THUMBS_DOWN': return '👎';
      case 'LAUGH': return '😄';
      case 'HOORAY': return '🎉';
      case 'CONFUSED': return '😕';
      case 'HEART': return '❤️';
      case 'ROCKET': return '🚀';
      case 'EYES': return '👀';
      default: return '👍';
    }
  };

  const renderAuthorBadge = (author: User) => {
    if (author.login === 'vercel') {
      return <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">bot</span>;
    }
    return null;
  };

  const parseMarkdownLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = text.split(linkRegex);
    
    if (parts.length <= 1) {
      return text;
    }
    
    const result: React.ReactNode[] = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        if (parts[i]) {
          result.push(parts[i]);
        }
      } else if (i % 3 === 1) {
        const linkText = parts[i];
        const linkUrl = parts[i + 1];
        result.push(
          <a 
            key={`link-${i}`} 
            href={linkUrl} 
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      }
    }
    
    return result;
  };
  const renderParagraphWithLinks = (paragraph: string, index: number) => {
    const content = parseMarkdownLinks(paragraph);
    
    return (
      <p key={index} className="mb-4 last:mb-0">
        {content}
      </p>
    );
  };

  if (isMinimized) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 my-3">
        <div className="text-gray-600 dark:text-gray-300 text-sm">
          <span>This comment has been minimized.</span>
          <button className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">Show comment</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="flex items-center">
              <a href={author.url} className="flex-shrink-0">
                <img 
                  src={author.avatarUrl} 
                  alt={author.login} 
                  className="w-6 h-6 rounded-full mr-2"
                />
              </a>
              <div>
                <a href={author.url} className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                  {author.login}
                </a>
                {renderAuthorBadge(author)}
                <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                  commented
                  <a href={`#comment-${comment.id}`} className="ml-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <RelativeTime datetime={createdAt} title={formatDate(createdAt)} />
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="px-4 py-3 bg-white dark:bg-gray-900">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {body.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                renderParagraphWithLinks(paragraph, index)
              ) : (
                <br key={index} />
              )
            ))}
          </div>
          {renderReactions()}
        </div>
      </div>
    </div>
  );
};
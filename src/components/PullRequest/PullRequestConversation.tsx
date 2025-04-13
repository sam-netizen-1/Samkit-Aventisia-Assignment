import React from 'react';
import { PullRequest, TimelineEvent, Comment, Review } from './types';
import { PullRequestComment } from './PullRequestComment';
import { PullRequestTimeline } from './PullRequestTimeline';

interface PullRequestConversationProps {
  pullRequest: PullRequest;
}

export const PullRequestConversation: React.FC<PullRequestConversationProps> = ({ pullRequest }) => {
  const { comments, timelineEvents, reviews } = pullRequest;
  const combinedTimeline = [
    ...comments.map(comment => ({ 
      type: 'comment' as const, 
      data: comment, 
      date: new Date(comment.createdAt) 
    })),
    ...reviews
      .filter(review => review.body)
      .map(review => ({ 
        type: 'review' as const, 
        data: review, 
        date: new Date(review.submittedAt) 
      })),
    ...timelineEvents.map(event => ({ 
      type: 'event' as const, 
      data: event, 
      date: new Date(event.createdAt) 
    }))
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="w-full">
      <h2 className="sr-only">Conversation</h2>
      
      <div className="mb-4">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-3">
            <img 
              src={pullRequest.author.avatarUrl} 
              alt={pullRequest.author.login} 
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-grow">
            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {pullRequest.author.login} created this pull request
                </span>
              </div>
              <div className="px-4 py-3 bg-white dark:bg-gray-900">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    There was a typo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {combinedTimeline.map((item, index) => {
          if (item.type === 'comment') {
            return (
              <div key={`comment-${item.data.id}`} className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={item.data.author.avatarUrl} 
                    alt={item.data.author.login} 
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <PullRequestComment comment={item.data} />
                </div>
              </div>
            );
          } else if (item.type === 'review') {
            const review = item.data;
            return (
              <div key={`review-${review.id}`} className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={review.author.avatarUrl} 
                    alt={review.author.login} 
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <div className="mb-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center border-b border-gray-200 dark:border-gray-700">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <a href={review.author.url} className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                              {review.author.login}
                            </a>
                            <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full 
                              ${review.state === 'APPROVED' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                                review.state === 'CHANGES_REQUESTED' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 
                                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                              {review.state === 'APPROVED' ? 'approved' : 
                               review.state === 'CHANGES_REQUESTED' ? 'requested changes' : 
                               'reviewed'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {review.body && (
                        <div className="px-4 py-3 bg-white dark:bg-gray-900">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            {review.body.split('\n').map((paragraph, idx) => (
                              paragraph.trim() ? (
                                <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                              ) : (
                                <br key={idx} />
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (item.type === 'event') {
            return (
              <div key={`event-${item.data.id}`} className="py-2">
                <PullRequestTimeline event={item.data} />
              </div>
            );
          }
          
          return null;
        })}
      </div>
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Sign in to comment</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You need to sign in to GitHub to join this conversation.
            </p>
            <div className="mt-3">
              <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign in to GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
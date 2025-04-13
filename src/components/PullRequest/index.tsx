import React, { useState } from 'react';
import { PullRequestHeader } from './PullRequestHeader';
import { PullRequestTabs } from './PullRequestTabs';
import { PullRequestConversation } from './PullRequestConversation';
import { PullRequestSidebar } from './PullRequestSidebar';
import { pullRequestData } from './mockData';
import { PullRequest } from './types';

interface PullRequestPageProps {
  pullRequest?: PullRequest;
  scrollY?: number;
}

export const PullRequestPage: React.FC<PullRequestPageProps> = ({
  pullRequest = pullRequestData,
  scrollY = 0
}) => {
  const [activeTab, setActiveTab] = useState<'conversation' | 'commits' | 'checks' | 'files'>('conversation');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="mb-6">
        <PullRequestHeader pullRequest={pullRequest} scrollY={scrollY} />
        
        <PullRequestTabs 
          pullRequest={pullRequest} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="mt-4 flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 md:pr-6">
            {activeTab === 'conversation' && (
              <PullRequestConversation pullRequest={pullRequest} />
            )}
            {activeTab === 'commits' && (
              <div className="bg-white p-4 border border-gray-200 rounded-md">
                <p className="text-gray-500 text-center py-8">Commits tab content would go here</p>
              </div>
            )}
            {activeTab === 'checks' && (
              <div className="bg-white p-4 border border-gray-200 rounded-md">
                <p className="text-gray-500 text-center py-8">Checks tab content would go here</p>
              </div>
            )}
            {activeTab === 'files' && (
              <div className="bg-white p-4 border border-gray-200 rounded-md">
                <p className="text-gray-500 text-center py-8">Files changed tab content would go here</p>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/4 mt-6 md:mt-0">
            <PullRequestSidebar pullRequest={pullRequest} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestPage;
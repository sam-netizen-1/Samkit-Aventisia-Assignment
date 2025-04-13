import React from "react";
import { PullRequest } from "./types";
import { RelativeTime } from "./RelativeTime";

interface PullRequestHeaderProps {
  pullRequest: PullRequest;
  scrollY?: number;
}

export const PullRequestHeader: React.FC<PullRequestHeaderProps> = ({
  pullRequest,
  scrollY = 0,
}) => {
  const {
    title,
    number,
    state,
    author,
    baseRepository,
    baseRefName,
    headRepository,
    headRefName,
    createdAt,
  } = pullRequest;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStateColor = () => {
    switch (state) {
      case "MERGED":
        return "bg-purple-600 text-white";
      case "OPEN":
        return "bg-green-600 text-white";
      case "CLOSED":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <>
      {/* Sticky header for scrolling - simplified version */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-700 z-50 py-2 px-4 shadow-sm transition-opacity duration-200 ${
          scrollY > 60 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <div className="mr-2 flex-shrink-0">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStateColor()}`}
                >
                  {state === "MERGED" && (
                    <svg
                      height="12"
                      className="mr-1"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="12"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"
                      ></path>
                    </svg>
                  )}
                  {state}
                </span>
              </div>

              <div className="min-w-0 mr-2">
                <h1 className="text-base font-medium flex">
                  <a
                    href="#top"
                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                  >
                    {title}
                  </a>
                  <span className="text-gray-500 dark:text-gray-400 pl-1">
                    #{number}
                  </span>
                </h1>
                <div className="flex flex-wrap items-center">
                  <div className="flex-auto min-w-0 ">
                    <a
                      href={author.url}
                      className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {author.login}
                    </a>
                    <span className="text-gray-600 dark:text-gray-400">
                      {state === "MERGED"
                        ? " merged "
                        : " opened this pull request "}
                    </span>

                    {state === "MERGED" && (
                      <>
                        <span className="text-gray-600 dark:text-gray-400">
                          1 commit into{" "}
                        </span>
                        <span className="inline-flex items-center">
                          <a
                            href={`/${baseRepository.owner.login}/${baseRepository.name}/tree/${baseRefName}`}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                          >
                            <span className="truncate">
                              {baseRepository.owner.login}
                            </span>
                            :<span className="truncate">{baseRefName}</span>
                          </a>
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {" "}
                          from{" "}
                        </span>
                        <span className="inline-flex items-center">
                          <a
                            href={`/${headRepository.owner.login}/${headRepository.name}/tree/${headRefName}`}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                          >
                            <span className="truncate">
                              {headRepository.owner.login}
                            </span>
                            :<span className="truncate">{headRefName}</span>
                          </a>
                        </span>
                      </>
                    )}

                    <RelativeTime
                      datetime={createdAt}
                      className="text-gray-600 dark:text-gray-400 whitespace-nowrap"
                      title={formatDate(createdAt)}
                    >
                      {formatDate(createdAt)}
                    </RelativeTime>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex flex-col md:flex-row mb-2">
          <div className="md:order-1 md:ml-2 mb-3 md:mb-2 flex items-center gap-2 flex-shrink-0">
            <div className="relative inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 text-sm rounded">
                New issue
              </button>
            </div>
            <div className="md:hidden text-right flex-auto">
              <a
                href="#comments"
                className="py-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Jump to bottom
              </a>
            </div>
          </div>

          <h1 className="text-2xl font-semibold break-words flex-auto mr-0 mb-2 dark:text-white pull-request-title">
            <span>{title}</span>
            <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
              #{number}
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center mt-2">
          <div className="flex-shrink-0 mb-2 mr-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getStateColor()}`}
            >
              {state === "MERGED" && (
                <svg
                  height="16"
                  className="mr-1"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"
                  ></path>
                </svg>
              )}
              {state === "OPEN" && (
                <svg
                  height="16"
                  className="mr-1"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"
                  ></path>
                </svg>
              )}
              {state === "CLOSED" && (
                <svg
                  height="16"
                  className="mr-1"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 5.5a.75.75 0 0 1 .75.75v3.378a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 1 .75-.75Zm-2.03-5.273a.75.75 0 0 1 1.06 0l.97.97.97-.97a.748.748 0 0 1 1.265.332.75.75 0 0 1-.205.729l-.97.97.97.97a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-.97-.97-.97.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l.97-.97-.97-.97a.75.75 0 0 1 0-1.06ZM2.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                  ></path>
                </svg>
              )}
              {state}
            </span>
          </div>

          <div className="flex-auto min-w-0 mb-2">
            <a
              href={author.url}
              className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {author.login}
            </a>
            <span className="text-gray-600 dark:text-gray-400">
              {state === "MERGED" ? " merged " : " opened this pull request "}
            </span>

            {state === "MERGED" && (
              <>
                <span className="text-gray-600 dark:text-gray-400">
                  1 commit into{" "}
                </span>
                <span className="inline-flex items-center">
                  <a
                    href={`/${baseRepository.owner.login}/${baseRepository.name}/tree/${baseRefName}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                  >
                    <span className="truncate">
                      {baseRepository.owner.login}
                    </span>
                    :<span className="truncate">{baseRefName}</span>
                  </a>
                </span>
                <span className="text-gray-600 dark:text-gray-400"> from </span>
                <span className="inline-flex items-center">
                  <a
                    href={`/${headRepository.owner.login}/${headRepository.name}/tree/${headRefName}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                  >
                    <span className="truncate">
                      {headRepository.owner.login}
                    </span>
                    :<span className="truncate">{headRefName}</span>
                  </a>
                </span>
              </>
            )}

            <RelativeTime
              datetime={createdAt}
              className="text-gray-600 dark:text-gray-400 whitespace-nowrap"
              title={formatDate(createdAt)}
            >
              {formatDate(createdAt)}
            </RelativeTime>
          </div>
        </div>
      </div>
    </>
  );
};

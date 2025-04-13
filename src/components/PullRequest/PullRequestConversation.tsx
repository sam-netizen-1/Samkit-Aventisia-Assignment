import React from "react";
import { PullRequest, TimelineEvent, Comment, Review } from "./types";
import { PullRequestComment } from "./PullRequestComment";
import { PullRequestTimeline } from "./PullRequestTimeline";
import { RelativeTime } from "./RelativeTime";

interface PullRequestConversationProps {
  pullRequest: PullRequest;
}

export const PullRequestConversation: React.FC<
  PullRequestConversationProps
> = ({ pullRequest }) => {
  const { comments, timelineEvents, reviews } = pullRequest;
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );

  const combinedTimeline = [
    ...comments.map((comment) => ({
      type: "comment" as const,
      data: comment,
      date: new Date(comment.createdAt),
    })),
    ...reviews.map((review) => ({
      type: "review" as const,
      data: review,
      date: new Date(review.submittedAt),
    })),
    ...timelineEvents.map((event) => ({
      type: "event" as const,
      data: event,
      date: new Date(event.createdAt),
    })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderVercelTable = (body: string) => {
    if (body.includes("| Name | Status | Preview | Updated")) {
      const tableStart = body.indexOf("| Name | Status");
      const tableEnd =
        body.indexOf("\n\n", tableStart) > 0
          ? body.indexOf("\n\n", tableStart)
          : body.length;
      const tableContent = body.substring(tableStart, tableEnd);

      const rows = tableContent.split("\n").filter((row) => row.trim() !== "");
      const headerRow = rows[0];
      const separatorRow = rows[1];
      const dataRows = rows.slice(2);

      const headerCells = headerRow
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell !== "");

      return (
        <div className="mt-4">
          <table className="w-full text-sm text-left mt-2">
            <thead>
              <tr>
                {headerCells.map((cell, index) => (
                  <th
                    key={index}
                    className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rowIndex) => {
                const cells = row
                  .split("|")
                  .map((cell) => cell.trim())
                  .filter((cell) => cell !== "");
                return (
                  <tr key={rowIndex}>
                    {cells.map((cell, cellIndex) => {
                      if (
                        cell.includes("[") &&
                        cell.includes("]") &&
                        cell.includes("(") &&
                        cell.includes(")")
                      ) {
                        const linkMatch = cell.match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (linkMatch) {
                          const [fullMatch, text, url] = linkMatch;
                          return (
                            <td
                              key={cellIndex}
                              className="px-3 py-2 border-b border-gray-200 dark:border-gray-700"
                            >
                              <a
                                href={url}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {text}
                              </a>
                            </td>
                          );
                        }
                      }

                      if (cell.includes("✅")) {
                        return (
                          <td
                            key={cellIndex}
                            className="px-3 py-2 border-b border-gray-200 dark:border-gray-700"
                          >
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              {cell}
                            </span>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={cellIndex}
                          className="px-3 py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
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

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCopyLink = (id: string, type: "comment" | "review") => {
    const url = `${window.location.href.split("#")[0]}#${type}-${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Link copied to clipboard");
        setActiveDropdown(null);
      })
      .catch((err) => {
        console.error("Could not copy link: ", err);
      });
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="w-full">
      <h2 className="sr-only">Conversation</h2>

      <div className="mb-4 relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>

        {combinedTimeline.map((item, index) => {
          if (item.type === "comment") {
            const comment = item.data;
            const isVercelBot = comment.author.login === "vercel";

            return (
              <div
                key={`comment-${comment.id}`}
                className="flex items-start mb-4"
              >
                <div className="flex-shrink-0 mr-3 z-10">
                  <img
                    src={comment.author.avatarUrl}
                    alt={comment.author.login}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900"
                  />
                </div>
                <div className="flex-grow">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <div className="bg-gray-50 dark:bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <a
                            href={comment.author.url}
                            className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {comment.author.login}
                          </a>
                          {isVercelBot && (
                            <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                              bot
                            </span>
                          )}
                          <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                            commented
                            <a
                              href={`#comment-${comment.id}`}
                              className="ml-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <RelativeTime
                                datetime={comment.createdAt}
                                title={formatDate(comment.createdAt)}
                              />
                            </a>
                          </span>
                        </div>
                      </div>
                      {comment.body && comment.body.trim() !== "" && (
                        <div className="relative">
                          <button
                            onClick={() =>
                              toggleDropdown(`comment-${comment.id}`)
                            }
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                            </svg>
                          </button>
                          {activeDropdown === `comment-${comment.id}` && (
                            <div
                              ref={dropdownRef}
                              className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#161b22] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                            >
                              <ul>
                                <li>
                                  <button
                                    onClick={() =>
                                      handleCopyLink(comment.id, "comment")
                                    }
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  >
                                    Copy link
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-3 bg-white dark:bg-[#0d1117]">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {comment.body
                          .split("\n\n")
                          .map((paragraph, idx) =>
                            paragraph.trim() ? (
                              renderParagraphWithLinks(paragraph, idx)
                            ) : (
                              <br key={idx} />
                            )
                          )}
                        {isVercelBot && renderVercelTable(comment.body)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (item.type === "review") {
            const review = item.data;

            return (
              <div
                key={`review-${review.id}`}
                className="flex items-start mb-4"
              >
                <div className="flex-shrink-0 mr-3 z-10">
                  <img
                    src={review.author.avatarUrl}
                    alt={review.author.login}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900"
                  />
                </div>
                <div className="flex-grow">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <div className="bg-gray-50 dark:bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <a
                            href={review.author.url}
                            className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {review.author.login}
                          </a>
                          <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                            {review.state === "APPROVED"
                              ? "approved these changes"
                              : review.state === "CHANGES_REQUESTED"
                              ? "requested changes"
                              : "reviewed"}
                            <a
                              href={`#review-${review.id}`}
                              className="ml-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <RelativeTime
                                datetime={review.submittedAt}
                                title={formatDate(review.submittedAt)}
                              />
                            </a>
                          </span>
                          <div className="ml-auto pr-4">
                            <a
                              href="#"
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              View reviewed changes
                            </a>
                          </div>
                        </div>
                      </div>
                      {review.body && review.body.trim() !== "" && (
                        <div className="relative">
                          <button
                            onClick={() =>
                              toggleDropdown(`review-${review.id}`)
                            }
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                            </svg>
                          </button>
                          {activeDropdown === `review-${review.id}` && (
                            <div
                              ref={dropdownRef}
                              className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#161b22] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                            >
                              <ul>
                                <li>
                                  <button
                                    onClick={() =>
                                      handleCopyLink(review.id, "review")
                                    }
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  >
                                    Copy link
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {review.body && (
                      <div className="px-4 py-3 bg-white dark:bg-[#0d1117]">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {review.body.split("\n").map((paragraph, idx) =>
                            paragraph.trim() ? (
                              <p key={idx} className="mb-4 last:mb-0">
                                {paragraph}
                              </p>
                            ) : (
                              <br key={idx} />
                            )
                          )}
                        </div>

                        {review.reactions &&
                          review.reactions.totalCount > 0 && (
                            <div className="mt-2 flex items-center">
                              {review.reactions.types.map((reaction) => (
                                <div
                                  key={reaction.type}
                                  className="mr-2 flex items-center border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5"
                                >
                                  <span className="mr-1">
                                    {reaction.type === "HEART"
                                      ? "❤️"
                                      : reaction.type === "THUMBS_UP"
                                      ? "👍"
                                      : reaction.type === "THUMBS_DOWN"
                                      ? "👎"
                                      : reaction.type === "LAUGH"
                                      ? "😄"
                                      : reaction.type === "CONFUSED"
                                      ? "😕"
                                      : reaction.type === "HOORAY"
                                      ? "🎉"
                                      : reaction.type === "ROCKET"
                                      ? "🚀"
                                      : reaction.type === "EYES"
                                      ? "👀"
                                      : ""}
                                  </span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {reaction.count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          } else if (item.type === "event") {
            return (
              <div key={`event-${item.data.id}`} className="py-2 relative z-10">
                <PullRequestTimeline event={item.data} />
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up for free
            </button>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              to join this conversation on GitHub. Already have an account?
              <a
                href="#"
                className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign in to comment
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

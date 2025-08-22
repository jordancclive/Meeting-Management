import React from 'react';
import { GithubIcon } from 'lucide-react';
interface GitHubEmbedProps {
  url: string;
  starCount: number;
}
export const GitHubEmbed: React.FC<GitHubEmbedProps> = ({
  url,
  starCount
}) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };
  return <button onClick={handleClick} className="flex items-center h-6 rounded-md overflow-hidden border border-gray-300 hover:border-gray-400 transition-colors" aria-label="View project on GitHub">
      <div className="flex items-center justify-center bg-gray-100 h-full px-1.5">
        <GithubIcon className="h-4 w-4 text-gray-800" />
      </div>
      <div className="px-2 font-medium text-gray-800 text-xs">{starCount}</div>
    </button>;
};
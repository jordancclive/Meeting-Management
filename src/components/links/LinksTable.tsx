import React from 'react';
import { FolderIcon, LinkIcon, StarIcon, PinIcon, MoreVerticalIcon } from 'lucide-react';
import { Card } from '../Card';
export const LinksTable = ({
  links
}) => {
  // Separate folders and links, then sort each group alphabetically
  const folders = links.filter(item => item.type === 'folder').sort((a, b) => a.name.localeCompare(b.name));
  const linkItems = links.filter(item => item.type === 'link').sort((a, b) => a.name.localeCompare(b.name));
  // Combine with folders first, then links
  const sortedItems = [...folders, ...linkItems];
  return <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <tbody>
            {sortedItems.map(item => <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {item.type === 'folder' ? <FolderIcon className="h-5 w-5 text-amber-500 mr-3" /> : <LinkIcon className="h-5 w-5 text-azure-500 mr-3" />}
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-slate-900 mr-2">
                        {item.name}
                      </span>
                      {item.isStarred && <StarIcon className="h-4 w-4 text-amber-400" />}
                      {item.isPinned && <PinIcon className="h-4 w-4 text-azure-500 ml-1" />}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" style={{
              width: '60px'
            }}>
                  <div className="flex items-center justify-end">
                    <button className="text-slate-400 hover:text-slate-600" title="More options">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>)}
            {links.length === 0 && <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-sm text-slate-500">
                  No links or folders found matching your criteria
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
    </Card>;
};
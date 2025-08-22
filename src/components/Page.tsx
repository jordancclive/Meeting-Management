import React from 'react';
interface PageProps {
  title: string;
}
export const Page: React.FC<PageProps> = ({
  title
}) => {
  return <main className="flex-1 p-6 w-full">
      <div className="max-w-7xl w-full mx-auto">
        <h1 style={{
        fontFamily: '"Roboto Slab", serif',
        fontOpticalSizing: 'auto',
        fontWeight: 600,
        fontStyle: 'normal',
        fontSize: '32px'
      }} className="text-slate-900">
          {title}
        </h1>
      </div>
    </main>;
};
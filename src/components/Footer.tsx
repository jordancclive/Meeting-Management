import React from 'react';
export const Footer = () => {
  return <footer className="w-full py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-xs text-gray-400">
        Copyright © 2025 The Linux Foundation®. All rights reserved. The Linux
        Foundation has registered trademarks and uses trademarks. For more
        information, including terms of use,
        <a href="https://www.linuxfoundation.org/legal/platform-use-agreement/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
          {' '}
          Platform Usage
        </a>
        ,{' '}
        <a href="https://www.linuxfoundation.org/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
          Privacy Policy
        </a>
        ,{' '}
        <a href="https://www.linuxfoundation.org/legal/trademark-usage" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
          Trademark Usage
        </a>
        , please see our{' '}
        <a href="https://www.linuxfoundation.org/legal/policies" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
          Policies
        </a>{' '}
        page.
      </div>
    </footer>;
};
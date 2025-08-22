import React, { createElement } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
// Add Google Fonts preconnect and stylesheet links
const head = document.head;
const preconnect1 = document.createElement('link');
preconnect1.rel = 'preconnect';
preconnect1.href = 'https://fonts.googleapis.com';
head.appendChild(preconnect1);
const preconnect2 = document.createElement('link');
preconnect2.rel = 'preconnect';
preconnect2.href = 'https://fonts.gstatic.com';
preconnect2.crossOrigin = '';
head.appendChild(preconnect2);
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap';
head.appendChild(fontLink);
// Function to initialize the React app with more robust root element handling
const initializeApp = () => {
  let container = document.getElementById('root');
  // If no root element exists, create one
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    container.style.width = '100%';
    container.style.height = '100vh';
    document.body.appendChild(container);
  }
  // Ensure the container is a valid DOM element
  if (container && container.nodeType === Node.ELEMENT_NODE) {
    try {
      const root = createRoot(container);
      root.render(<AppRouter />);
    } catch (error) {
      console.error('Failed to create React root:', error);
      // Fallback: try to render to document.body if root creation fails
      const fallbackContainer = document.createElement('div');
      fallbackContainer.style.width = '100%';
      fallbackContainer.style.height = '100vh';
      document.body.appendChild(fallbackContainer);
      const fallbackRoot = createRoot(fallbackContainer);
      fallbackRoot.render(<AppRouter />);
    }
  } else {
    console.error('Could not create or find a valid container element');
  }
};
// Wait for DOM to be ready before initializing the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready
  initializeApp();
}
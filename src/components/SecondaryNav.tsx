import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarIcon, MailIcon, UsersIcon, LinkIcon, BarChartIcon, ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon, KeyIcon, MegaphoneIcon, VoteIcon } from 'lucide-react';
import { GitHubEmbed } from './GitHubEmbed';
export const SecondaryNav = ({
  selectedOption,
  navigate
}) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef(null);
  // Define submenu items based on selected option
  const getNavItems = () => {
    if (selectedOption === 'Kubernetes') {
      return [{
        name: 'Insights',
        icon: <BarChartIcon className="h-5 w-5" />,
        path: '/kubernetes/insights',
        hideInMVP: true
      }, {
        name: 'Marketing',
        icon: <MegaphoneIcon className="h-5 w-5" />,
        path: '/kubernetes/marketing',
        hideInMVP: true
      }, {
        name: 'Meetings',
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        path: '/kubernetes/meetings'
      }, {
        name: 'Mailing Lists',
        icon: <MailIcon className="h-5 w-5" />,
        path: '/kubernetes/mailing-lists',
        hideInMVP: true
      }, {
        name: 'Votes & Polls',
        icon: <VoteIcon className="h-5 w-5" />,
        path: '/kubernetes/votes-polls',
        hideInMVP: true
      }, {
        name: 'Links & Docs',
        icon: <LinkIcon className="h-5 w-5" />,
        path: '/kubernetes/links-docs',
        hideInMVP: true
      }, {
        name: 'Committees',
        icon: <UsersIcon className="h-5 w-5" />,
        path: '/kubernetes/committees'
      }, {
        name: 'Permissions',
        icon: <KeyIcon className="h-5 w-5" />,
        path: '/kubernetes/permissions'
      }];
    } else if (selectedOption === 'PyTorch') {
      return [{
        name: 'Insights',
        icon: <BarChartIcon className="h-5 w-5" />,
        path: '/pytorch/insights',
        hideInMVP: true
      }, {
        name: 'Marketing',
        icon: <MegaphoneIcon className="h-5 w-5" />,
        path: '/pytorch/marketing',
        hideInMVP: true
      }, {
        name: 'Meetings',
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        path: '/pytorch/meetings'
      }, {
        name: 'Mailing Lists',
        icon: <MailIcon className="h-5 w-5" />,
        path: '/pytorch/mailing-lists',
        hideInMVP: true
      }, {
        name: 'Votes & Polls',
        icon: <VoteIcon className="h-5 w-5" />,
        path: '/pytorch/votes-polls',
        hideInMVP: true
      }, {
        name: 'Links & Docs',
        icon: <LinkIcon className="h-5 w-5" />,
        path: '/pytorch/links-docs',
        hideInMVP: true
      }, {
        name: 'Committees',
        icon: <UsersIcon className="h-5 w-5" />,
        path: '/pytorch/committees'
      }, {
        name: 'Permissions',
        icon: <KeyIcon className="h-5 w-5" />,
        path: '/pytorch/permissions'
      }];
    } else {
      return [];
    }
  };
  // Get all navigation items
  const allNavItems = getNavItems();
  // Filter out items that should be hidden in MVP
  const navItems = allNavItems.filter(item => !item.hideInMVP);
  // Update active item based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = allNavItems.find(item => item.path === currentPath);
    if (matchingItem) {
      // If the current path matches a hidden item, redirect to the first visible item
      if (matchingItem.hideInMVP && navItems.length > 0) {
        navigate(navItems[0].path);
        setActiveItem(navItems[0].name);
      } else {
        setActiveItem(matchingItem.name);
      }
    } else if (navItems.length > 0 && navItems[0].name) {
      // If no match is found, default to first item
      setActiveItem(navItems[0].name);
    } else {
      setActiveItem('');
    }
  }, [location.pathname, navItems, allNavItems]);
  // Check if scrolling is needed
  const checkForScrolling = () => {
    if (navRef.current) {
      const {
        scrollWidth,
        clientWidth,
        scrollLeft
      } = navRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };
  // Handle scroll buttons
  const handleScroll = direction => {
    if (navRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      navRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      // Update scroll button states after scrolling
      setTimeout(() => {
        checkForScrolling();
      }, 300);
    }
  };
  // Check for scrolling after items change
  useEffect(() => {
    setTimeout(() => {
      checkForScrolling();
    }, 100);
  }, [selectedOption]);
  // Add resize listener to check for scrolling
  useEffect(() => {
    window.addEventListener('resize', checkForScrolling);
    return () => {
      window.removeEventListener('resize', checkForScrolling);
    };
  }, []);
  // Add scroll listener to update scroll button states
  useEffect(() => {
    const currentNavRef = navRef.current;
    if (currentNavRef) {
      currentNavRef.addEventListener('scroll', checkForScrolling);
      return () => {
        currentNavRef.removeEventListener('scroll', checkForScrolling);
      };
    }
  }, [navRef.current]);
  // If no submenu items, don't render the component
  if (navItems.length === 0) {
    return null;
  }
  const handleItemClick = item => {
    if (item.type === 'github-embed') {
      window.open(item.url, '_blank');
      return;
    }
    setActiveItem(item.name);
    if (item.link) {
      window.open(item.link, '_blank');
    }
    if (item.path) {
      navigate(item.path);
    }
  };
  // Scroll active item into view when it changes
  useEffect(() => {
    if (navRef.current && activeItem) {
      const activeElement = navRef.current.querySelector(`[data-item-name="${activeItem}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeItem]);
  return <div className="flex bg-white w-full border-b border-gray-200 px-3 sm:px-4 relative">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center h-14 relative">
          {/* Scroll left button */}
          {showScrollButtons && canScrollLeft && <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1" onClick={() => handleScroll('left')}>
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>}
          <div ref={navRef} className="flex items-center overflow-x-auto scrollbar-hide" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
            {navItems.map((item, index) => item.type === 'github-embed' ? <div key={`github-embed-${index}`} className="mx-1 my-2">
                  <GitHubEmbed url={item.url} starCount={69} />
                </div> : <button key={item.name} data-item-name={item.name} className={`flex items-center whitespace-nowrap px-3 py-1.5 mx-1 my-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 ${activeItem === item.name ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`} onClick={() => handleItemClick(item)}>
                  <span className={`mr-1.5 sm:mr-2 ${activeItem === item.name ? 'text-blue-600' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate max-w-[120px] sm:max-w-none">
                    {item.name}
                  </span>
                </button>)}
          </div>
          {/* Scroll right button */}
          {showScrollButtons && canScrollRight && <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1" onClick={() => handleScroll('right')}>
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>}
        </div>
      </div>
    </div>;
};
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, BellIcon, FileTextIcon, LifeBuoyIcon, SettingsIcon, UserIcon, MenuIcon, XIcon, ClockIcon, GridIcon } from 'lucide-react';
import { IconButton } from './IconButton';
export const Navbar = ({
  selectedOption,
  setSelectedOption
}) => {
  const navigate = useNavigate();
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Dropdown options - simplified to only include projects
  const dropdownOptions = [{
    name: 'Kubernetes',
    type: 'project',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png',
    defaultPath: '/kubernetes/insights'
  }, {
    name: 'PyTorch',
    type: 'project',
    logo: 'https://pytorch.org/assets/images/pytorch-logo.png',
    defaultPath: '/pytorch/insights'
  }];
  const handleOptionSelect = option => {
    setSelectedOption(option.name);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    // Navigate to the default path for this option
    if (option.defaultPath) {
      navigate(option.defaultPath);
    }
  };
  // Get the current selected option
  const currentOption = dropdownOptions.find(opt => opt.name === selectedOption) || dropdownOptions[0];
  // Close dropdown when clicking outside
  const handleClickOutside = e => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  // Toggle mobile menu
  const toggleMobileMenu = e => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };
  // Handle Documentation click
  const handleDocumentationClick = () => {
    window.open('https://docs.linuxfoundation.org/lfx', '_blank');
  };
  // Handle Support click
  const handleSupportClick = () => {
    window.open('https://jira.linuxfoundation.org/plugins/servlet/desk/portal/4', '_blank');
  };
  // Handle Change Log click
  const handleChangeLogClick = () => {
    console.log('Change Log clicked');
    // In a real app, this would open the change log modal or navigate to the change log page
  };
  // Handle logo click to navigate to meetings page
  const handleLogoClick = () => {
    // Navigate to the meetings page for the current selected project
    navigate(`/${selectedOption.toLowerCase()}/meetings`);
  };
  return <nav className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white w-full shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-6">
          {/* LFX Product Menu Button (Grid Icon) */}
          <button className="text-slate-600 hover:text-azure-600 transition-colors p-1">
            <GridIcon className="h-6 w-6" />
          </button>
          {/* LFX Logo with Projects Text */}
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <div className="flex items-center">
              <img src="/lfxlogo.svg" alt="LFX Logo" className="h-6" />
              <div className="mx-3 h-6 w-px bg-slate-300"></div>
              <span style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 300,
              fontSize: '29px',
              lineHeight: '1'
            }} className="text-slate-800">
                Projects
              </span>
            </div>
          </div>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg px-3 sm:px-4 py-2 shadow-sm transition-all duration-200 w-[400px]" aria-expanded={isDropdownOpen} aria-haspopup="true">
              <div className="flex items-center flex-1 overflow-hidden">
                <div className="bg-gray-100 p-1 rounded-full mr-1.5 sm:mr-2.5 flex-shrink-0">
                  <img src={currentOption.logo} alt={currentOption.name} className="h-5 w-5 rounded-full" />
                </div>
                <span className="text-gray-800 font-medium mr-1 sm:mr-2 truncate">
                  {selectedOption}
                </span>
              </div>
              <ChevronDownIcon className={`h-5 w-5 text-gray-600 transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && <div className="absolute left-0 mt-2 w-[400px] bg-white rounded-md shadow-lg z-20 border border-gray-200 py-1">
                <div className="max-h-[60vh] overflow-y-auto">
                  {dropdownOptions.map(option => <button key={option.name} className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors 
                        ${selectedOption === option.name ? 'bg-blue-50' : ''}`} onClick={() => handleOptionSelect(option)}>
                      <div className={`p-1.5 rounded-full bg-gray-100 mr-3 flex-shrink-0 ${selectedOption === option.name ? 'bg-blue-100' : ''}`}>
                        <img src={option.logo} alt={option.name} className="h-5 w-5 rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium truncate ${selectedOption === option.name ? 'text-blue-600' : 'text-gray-800'}`}>
                          {option.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize truncate">
                          {option.type}
                        </p>
                      </div>
                    </button>)}
                </div>
              </div>}
          </div>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Notification button - hidden for MVP but code preserved */}
          {false && <div className="relative">
              <IconButton icon={<BellIcon className="h-5 w-5 text-gray-600" />} tooltip="Notifications (3 new)" />
              <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full"></div>
            </div>}
          <IconButton icon={<ClockIcon className="h-5 w-5 text-gray-600" />} tooltip="Change Log" onClick={handleChangeLogClick} />
          <IconButton icon={<FileTextIcon className="h-5 w-5 text-gray-600" />} tooltip="Documentation" onClick={handleDocumentationClick} />
          <IconButton icon={<LifeBuoyIcon className="h-5 w-5 text-gray-600" />} tooltip="Support" onClick={handleSupportClick} />
          <IconButton icon={<SettingsIcon className="h-5 w-5 text-gray-600" />} tooltip="Settings" />
          <div className="relative group">
            <div className="cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-red-500">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                <svg width="16" height="16" viewBox="0 0 16 16" className="cursor-pointer">
                  <circle cx="8" cy="8" r="8" fill="white" />
                  {/* Grey border for the entire chart */}
                  <circle cx="8" cy="8" r="6" fill="transparent" stroke="#D1D5DB" strokeWidth="0.5" />
                  {/* Red progress indicator */}
                  <circle cx="8" cy="8" r="6" fill="transparent" stroke="#FF0000" strokeWidth="4" strokeDasharray={`${33 / 100 * 37.7} 37.7`} transform="rotate(-90 8 8)" />
                </svg>
              </div>
            </div>
            <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 top-full right-0 transform translate-y-1 w-max max-w-[150px] text-center">
              Profile 33% complete
            </div>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <div className="mr-2 relative group">
            <div className="cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-red-500">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" fill="white" />
                  <circle cx="8" cy="8" r="6" fill="transparent" stroke="#D1D5DB" strokeWidth="0.5" />
                  <circle cx="8" cy="8" r="6" fill="transparent" stroke="#FF0000" strokeWidth="4" strokeDasharray={`${33 / 100 * 37.7} 37.7`} transform="rotate(-90 8 8)" />
                </svg>
              </div>
            </div>
            <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 top-full right-0 transform translate-y-1 w-max max-w-[150px] text-center">
              Profile 33% complete
            </div>
          </div>
          <button onClick={toggleMobileMenu} className="p-2 rounded-md text-gray-600 hover:bg-gray-100" aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="absolute top-[60px] left-0 right-0 bg-white shadow-lg z-30 md:hidden border-t border-gray-200">
            <div className="max-w-7xl mx-auto p-4 space-y-4">
              <div className="grid grid-cols-4 gap-4">
                {/* Notification button - hidden for MVP but code preserved */}
                {false && <div className="relative">
                    <IconButton icon={<BellIcon className="h-5 w-5 text-gray-600" />} tooltip="Notifications (3 new)" />
                    <div className="absolute top-0 right-4 h-2.5 w-2.5 bg-red-500 rounded-full"></div>
                  </div>}
                <IconButton icon={<ClockIcon className="h-5 w-5 text-gray-600" />} tooltip="Change Log" onClick={handleChangeLogClick} />
                <IconButton icon={<FileTextIcon className="h-5 w-5 text-gray-600" />} tooltip="Documentation" onClick={handleDocumentationClick} />
                <IconButton icon={<LifeBuoyIcon className="h-5 w-5 text-gray-600" />} tooltip="Support" onClick={handleSupportClick} />
                <IconButton icon={<SettingsIcon className="h-5 w-5 text-gray-600" />} tooltip="Settings" className="col-span-1" />
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-3 pb-2">
                  <div className="w-10 h-10 rounded-full bg-red-500">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">
                      Profile 33% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
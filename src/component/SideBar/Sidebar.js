import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../App.css';
import './SideBar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const menuItems = [
    { name: 'Home', icon: 'ai-home-alt1', link: '/HomePage' },
    { name: 'Browse', icon: 'ai-dashboard', link: '/browse' },
    { name: 'Settings', icon: 'ai-gear', link: '/Settings' },
    { name: 'Write', icon: 'ai-folder-add', },
    { name: 'Profile', icon: 'ai-person', link: '/Profile' },
    { name: 'Notifications', icon: 'ai-bell' },
    { name: 'Book Shelf', icon: 'ai-cart', link: '/YourLibrary' },
    { name: 'LogOut', icon: 'ai-lock-off' },
  ];

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <header></header>
      <ul>
        {menuItems.map((item, index) => (
          <li key={item.name}>
            {item.link ? (
              <Link to={item.link}>
                <button
                  type="button"
                  onClick={() => toggleSubMenu(index)}
                  className={activeSubMenu === index ? 'active' : ''}
                >
                  <i className={item.icon}></i>
                  <p>{item.name}</p>
                  {item.subMenuItems && (
                    <i
                      className={`ai-chevron-down-small ${
                        activeSubMenu === index ? 'rotate-icon' : ''
                      }`}
                    ></i>
                  )}
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => toggleSubMenu(index)}
                className={activeSubMenu === index ? 'active' : ''}
              >
                <i className={item.icon}></i>
                <p>{item.name}</p>
                {item.subMenuItems && (
                  <i
                    className={`ai-chevron-down-small ${
                      activeSubMenu === index ? 'rotate-icon' : ''
                    }`}
                  ></i>
                )}
              </button>
            )}
            {item.subMenuItems && (
              <div
                className={`sub-menu ${
                  activeSubMenu === index ? 'open' : ''
                }`}
              >
                <ul>
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button type="button">{subItem}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
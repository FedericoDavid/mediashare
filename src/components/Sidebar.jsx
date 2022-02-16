import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

import { isNotActiveStyle, isActiveStyle } from '../utils/constants';
import { categories } from '../utils/useUserQuery';
import mediaShareLogo from '../assets/logo.png';

const Sidebar = ({ user, closeToggle }) => {
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link to='/' className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' onClick={closeToggle}>
          <img src={mediaShareLogo} alt='mediaShare-logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={closeToggle}
          >
            <AiFillHome /> Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
          {categories.slice(0, categories.length - 1).map((c) => (
            <NavLink
              to={`/category/${c.name}`}
              key={c.name}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={closeToggle}
            >
              <img src={c.image} className='w-8 h-8 rounded-full shadow-sm' alt='category' />
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={closeToggle}
        >
          <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile' />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;

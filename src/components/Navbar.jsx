import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const Navbar = ({ user, searchTerm, setSearchTerms }) => {
  const [language, setLanguage] = useState('en');
  const [languageSwitcher, setLanguageSwitcher] = useState(false);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = useCallback(() => {
    setLanguageSwitcher((v) => !v);

    i18n.changeLanguage(language);

    if (languageSwitcher) setLanguage('es');
    else setLanguage('en');
  }, [language, languageSwitcher, i18n]);

  return (
    user && (
      <div className='flex gap-2 md:gap-4 w-full mt-5 pb-7'>
        <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
          <IoMdSearch fontSize={21} className='ml-1' />
          <input
            type='text'
            onChange={(e) => setSearchTerms(e.target.value)}
            placeholder={t('search')}
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className='p-2 w-full bg-white outline-none'
          />
        </div>
        <div className='flex gap-2'>
          <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
            <img src={user.image} alt='user' className='w-14 h-12 rounded-lg' />
          </Link>
          <Link
            to='create-pin'
            className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'
          >
            <IoMdAdd />
          </Link>
          <button
            type='button'
            className='border-black outline-none border-2 rounded-lg w-12 h-12 md:w-14 md:h-12 hover:border-gray-300 m-0'
            onClick={handleLanguageChange}
          >
            {t(language)}
          </button>
        </div>
      </div>
    )
  );
};

export default Navbar;

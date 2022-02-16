import { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/useUserQuery';
import { client } from '../services/api/loginAPIClient';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { randomImage, activeBtnStyles, notActiveBtnStyles } from '../utils/constants';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [isActiveBtn, setIsActiveBtn] = useState('created');

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((res) => setUser(res[0]));
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((res) => setPins(res));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((res) => setPins(res));
    }
  }, [text, userId]);

  const onLogout = () => {
    localStorage.clear();

    navigate('/login');
  };

  if (!user) return <Spinner message='Loading Profile..' />;

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner-pic'
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user.image}
              alt='user-pic'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>{user.userName}</h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type='button'
                      className='bg-white p-2 rounded-full cursor-pointer shadow-md'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      data-tooltip-target='tooltip-dark'
                    >
                      <AiOutlineLogout color='red' fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={onLogout}
                  cookiePolicy='single_host_origin'
                />
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setIsActiveBtn('created');
              }}
              className={`${isActiveBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setIsActiveBtn('saved');
              }}
              className={`${isActiveBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {pins?.length > 0 ? (
            <div className='px-2'>
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No pins found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

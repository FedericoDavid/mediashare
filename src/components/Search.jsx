import React, { useState, useEffect } from 'react';
import { BsExclamationDiamondFill } from 'react-icons/bs';

import { client } from '../services/api/getAPIClient';
import { feedQuery, searchQuery } from '../utils/useUserQuery';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((res) => {
        setPins(res);
        setIsLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((res) => {
        setPins(res);
        setIsLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {isLoading && <Spinner message='Searching for pins...' />}
      {pins?.length > 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !isLoading && (
        <>
          <BsExclamationDiamondFill fontSize={32} color='red' />
          <div className='mt-10 text-center text-xl'>No Pins Found!</div>
        </>
      )}
    </div>
  );
};

export default Search;

import { useState, useEffect } from 'react';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { client } from '../services/api/getAPIClient';
import { feedQuery, searchQuery } from '../utils/useUserQuery';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

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
  }, [categoryId]);

  if (isLoading) return <Spinner message={`We are adding ${categoryId ?? 'new'} ideas to your feed!`} />;

  if (!pins?.length)
    return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <BsExclamationDiamondFill fontSize={32} color='red' />
        <h2 className='mt-5 text-2xl'>No pins found</h2>
      </div>
    );

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../services/api/loginAPIClient';
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

      client.fetch(query).then((data) => {
        setPins(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setIsLoading(false);
      });
    }
  }, [categoryId]);

  return isLoading ? (
    <Spinner message='We are adding new ideas to your feed!' />
  ) : (
    <div>{pins && <MasonryLayout pins={pins} />}</div>
  );
};

export default Feed;

export const userQuery = (userId) => `*[_type == "user" && _id == '${userId}']`;

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'] {
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _keys, 
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`;

  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _keys, 
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`;

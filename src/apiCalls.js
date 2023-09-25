const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls').then((response) =>
    response.json()
  );
};

const postUrls = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUrl),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};
export { getUrls, postUrls };

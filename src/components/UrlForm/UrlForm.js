import React, { useState } from 'react';

function UrlForm({ postUrls, setUrls, urls, getUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    clearInputs();

    const newUrl = {
      long_url: urlToShorten,
      title: title,
    };

    postUrls(newUrl)
      .then((data) => {
        setUrls([...urls, data]);
        getUrls();
      })
      .catch((error) => console.log(error));
  };

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  };

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={(e) => setUrlToShorten(e.target.value)}
      />

      <button onClick={(e) => handleSubmit(e)}>Shorten Please!</button>
    </form>
  );
}

export default UrlForm;

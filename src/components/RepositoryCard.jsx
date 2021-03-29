import React from 'react';

const RepositoryCard = (props) => {
  const { repository } = props;

  // console.log("repository", repository);
  return (
    <div className="repository">
      <div className="repository--title">{repository.full_name}</div>
      {
        repository.description &&
        <div className="repository--description">{repository.description}</div>
      }
      <div className="repository--stars">{repository.stargazers_count}</div>
    </div>
  );
}

export default RepositoryCard;

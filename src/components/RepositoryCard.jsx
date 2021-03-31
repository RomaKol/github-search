import React from 'react';

const RepositoryCard = (props) => {
  const { repository } = props;

  return (
    <div className="repository">
      <div className="repository__title">{repository.full_name}</div>
      {
        repository.description &&
        <div className="repository__description">{repository.description}</div>
      }
      <div className="repository__stars">{repository.stargazers_count}</div>
    </div>
  );
}

export default RepositoryCard;

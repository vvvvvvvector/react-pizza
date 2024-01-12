import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const onClickGoHome = () => {
    navigate('/');
  };

  return (
    <div className='notFound'>
      <h2>
        Page not found <span>😭</span>
      </h2>
      <button onClick={onClickGoHome} className='button button--emptyCart'>
        <span>Go home</span>
      </button>
    </div>
  );
};

export default NotFound;

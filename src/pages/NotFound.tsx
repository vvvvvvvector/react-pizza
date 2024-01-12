import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='notFound'>
      <h2>
        Page not found <span>😭</span>
      </h2>
      <button
        onClick={() => {
          navigate('/');
        }}
        className='button button--emptyCart'
      >
        <span>Go home</span>
      </button>
    </div>
  );
};

export default NotFound;

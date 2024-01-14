import { Loader } from 'lucide-react';

export const Loading = ({ text }: { text: string }) => {
  return (
    <div className='loading-wrapper'>
      <h2>{text}</h2>
      <Loader
        className='animate-spin'
        size={50}
        color='#bfbfbf'
        strokeWidth={1.5}
      />
    </div>
  );
};

import ContentLoader from 'react-content-loader';

export const Skeleton = () => {
  return (
    <div className='pizza-component-parent'>
      <ContentLoader
        speed={2}
        width={280}
        height={541}
        viewBox='0 0 280 541'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <circle cx='127' cy='136' r='121' />
        <rect x='15' y='276' rx='10' ry='10' width='230' height='27' />
        <rect x='0' y='323' rx='10' ry='10' width='260' height='94' />
        <rect x='5' y='444' rx='10' ry='10' width='87' height='30' />
        <rect x='167' y='437' rx='25' ry='25' width='93' height='44' />
      </ContentLoader>
    </div>
  );
};

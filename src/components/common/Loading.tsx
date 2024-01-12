import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ color: 'orange', fontSize: 55 }} />;

export const Loading = ({ info }: { info: string }) => {
  return (
    <div className='loading-wrapper'>
      <h2>{info}</h2>
      <Spin indicator={antIcon} size='large' />
    </div>
  );
};

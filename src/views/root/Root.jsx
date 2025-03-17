import NavigationBar from '@/components/organisms/NavigationBar/NavigationBar';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Root;

import { useRoutes } from 'react-router-dom';
import LazyLoading from '../components/LazyLoading';

const Soolvi = LazyLoading(() => import('../pages/soolvi'));

const AppRoutes = () => {
    let allRoutes = useRoutes([
        {
            path: '/',
            children: [{ element: <Soolvi />, index: true }],
        },
    ]);
    return allRoutes;
};

export default AppRoutes;

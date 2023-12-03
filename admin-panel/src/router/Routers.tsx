import { Outlet, Route, Routes } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { UsersList } from 'src/pages/users/list';
import { ErrorComponent } from '@refinedev/mui';
import Login from 'src/pages/login/Login';
import Register from 'src/pages/login/Register';
import MainLayout from 'src/pages/mainLayout';
import { UserCreate } from 'src/pages/users/create';

export const Routers = () => {
    return (
        <Routes>
            <Route
                element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                        <MainLayout />
                    </Authenticated>
                }
            >
                <Route path="/users">
                    <Route index element={<UsersList />} />
                    <Route path="create" element={<UserCreate />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
            </Route>
            <Route
                element={
                    <Authenticated fallback={<Outlet />}>
                        <NavigateToResource />
                    </Authenticated>
                }
            >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    );
};

export default Routers;

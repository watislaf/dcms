import { Outlet, Route, Routes } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { UsersList } from 'src/pages/users/list';
import { ErrorComponent, Header, ThemedLayoutV2, Title } from '@refinedev/mui';
import Login from 'src/pages/login/Login';
import Register from 'src/pages/login/Register';

export const Routers = () => {
    return (
        <Routes>
            <Route
                element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                        <ThemedLayoutV2
                            Header={() => <Header />}
                            Title={({ collapsed }) => <Title collapsed={collapsed} />}
                        >
                            <Outlet />
                        </ThemedLayoutV2>
                    </Authenticated>
                }
            >
                <Route path="/users">
                    <Route index element={<UsersList />} />
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

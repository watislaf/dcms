import { Outlet, Route, Routes } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { LoginPage } from 'src/pages/login/Login';
import { UsersList } from 'src/pages/users/list';
import { ErrorComponent, Header, ThemedLayoutV2, Title } from '@refinedev/mui';

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
                <Route path="/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};

export default Routers;

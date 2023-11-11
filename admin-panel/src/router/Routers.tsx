import { Outlet, Route, Routes } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/mantine';
import Header from 'src/components/Header/Header';
import { LoginPage } from 'src/pages/login';
import Title from 'src/components/Title/Title';
import { BlogPostCreate } from 'src/pages/blog-posts';
import { UsersList } from 'src/pages/users/list';

export const Routers = () => {
    return (
        <Routes>
            <Route
                element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                        <ThemedLayoutV2
                            Header={() => <Header sticky />}
                            Title={({ collapsed }) => <Title collapsed={collapsed} />}
                        >
                            <Outlet />
                        </ThemedLayoutV2>
                    </Authenticated>
                }
            >
                <Route index element={<NavigateToResource resource="blog_posts" />} />
                <Route path="/users">
                    <Route index element={<UsersList />} />
                    <Route path="create" element={<BlogPostCreate />} />
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

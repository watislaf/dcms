import { Outlet, Route, Routes } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { ErrorComponent, ThemedLayoutV2 } from '@refinedev/mantine';
import Header from 'src/components/Header/Header';
import { Login } from 'src/pages/login';
import { ForgotPassword } from 'src/pages/forgotPassword';
import Title from 'src/components/Title/Title';
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from 'src/pages/blog-posts';
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from 'src/pages/categories';

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
                <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                </Route>
                <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
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
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
        </Routes>
    );
};

export default Routers;

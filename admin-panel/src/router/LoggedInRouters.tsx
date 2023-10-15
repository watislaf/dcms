import { Route, Routes } from 'react-router-dom';
import { NavigateToResource } from '@refinedev/react-router-v6';
import { ErrorComponent } from '@refinedev/mantine';
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from 'src/pages/blog-posts';
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from 'src/pages/categories';

export const AppRouters = () => {
    return (
        <Routes>
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
        </Routes>
    );
};

export default AppRouters;

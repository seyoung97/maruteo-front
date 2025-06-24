import { MainLayout } from '@/components/layout/MainLayout';
import { PageLayout } from '@/components/layout/PageLayout';
import { ChatPage } from '@/pages/ChatPage';
import { ClassListPage } from '@/pages/ClassListPage';
import HomePage from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="auth/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route element={<PageLayout/>}>
        <Route path="class-list" element={<ClassListPage />} />
        <Route path='chat' element={<ChatPage/>}/>
      </Route>
    </>
  )
);

export default router;
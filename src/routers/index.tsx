import { MainLayout } from '@/components/layout/MainLayout';
import { PageLayout } from '@/components/layout/PageLayout';
import { AllClassListPage } from '@/pages/AllClassListPage';
import { LoginPage, ProfilePage, RegisterPage } from '@/pages/auth';
import { ChatPage } from '@/pages/ChatPage';
import ClassDetailPage from '@/pages/ClassDetailPage/ClassDetailPage';
import { ClassExploreCategoryPage, ClassExploreClassListPage, ClassExploreGiverListPage, ClassExplorePage } from '@/pages/ClassExplorePage';
import { GiverDetailPage } from '@/pages/GiverDetailPage';
import HomePage from '@/pages/HomePage';
import OneMonthMainPage from '@/pages/OneMonthPage/OneMonthMainPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route element={<PageLayout/>}>
        <Route path="class-list/all" element={<AllClassListPage />} handle={{ title: "수업 전체 목록" }} />
        <Route path="giver/:id" element={<GiverDetailPage />} handle={{ title: "한식 재능 기부자" }} />
        <Route path="class/:id" element={<ClassDetailPage />} handle={{ title: "수업 상세 안내" }} />
        <Route path="class-explore" element={<ClassExplorePage />} handle={{ title: "한식" }} />
        <Route path="class-explore/:category" element={<ClassExploreCategoryPage />} handle={{ title: "한식" }} />
        <Route path="class-explore/:category/givers" element={<ClassExploreGiverListPage />} handle={{ title: "한식 재능 기부자" }} />
        <Route path="class-explore/:category/classes" element={<ClassExploreClassListPage />} handle={{ title: "수업 전체 목록" }} />
        <Route path='chat' element={<ChatPage/>} handle={{ title: "채팅" }}/>
        <Route path="one-month" element={<OneMonthMainPage />} />
      </Route>
    </>
  )
);

export default router;
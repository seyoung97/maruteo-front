import { MainLayout } from '@/components/layout/MainLayout';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoginPage, ProfilePage, RegisterPage } from '@/pages/auth';
import { RegisterLearningTalentPage, RegisterTalentPage } from '@/pages/auth/Profile';
import { ChatConversationPage, ChatPage } from '@/pages/ChatPage';
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
      <Route path="/profile/register-talent" element={<RegisterTalentPage />} />
      <Route path="/profile/register-learning-talent" element={<RegisterLearningTalentPage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route element={<PageLayout/>}>
        <Route path="giver/:id" element={<GiverDetailPage />} handle={{ title: "한식 재능 기부자" }} />
        <Route path="class/:id" element={<ClassDetailPage />} handle={{ title: "수업 상세 안내" }} />
        <Route path="class-explore" element={<ClassExplorePage />} handle={{ title: "재능 탐색" }} />
        <Route path="class-explore/:category" element={<ClassExploreCategoryPage />} handle={{ title: ":category" }} />
        <Route path="class-explore/:category/givers" element={<ClassExploreGiverListPage />} handle={{ title: ":category 재능 기부자" }} />
        <Route path="class-explore/:category/classes" element={<ClassExploreClassListPage />} handle={{ title: ":category 수업 목록" }} />
        <Route path="one-month" element={<OneMonthMainPage />} handle={{ title: "의성 한 달 살이" }} />
      </Route>
      {/* Chat 관련 페이지들은 상단바/하단바 없이 풀스크린 */}
      <Route path='chat' element={<ChatPage/>}/>
      <Route path='chat/conversation' element={<ChatConversationPage/>}/>
    </>
  )
);

export default router;
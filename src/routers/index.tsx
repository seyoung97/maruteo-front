import { MainLayout } from '@/components/layout/MainLayout';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoginPage, ProfilePage, RegisterPage } from '@/pages/auth';
import { MyPage } from '@/pages/auth/MyPage/MyPage';
import { RegisterLearningTalentPage, RegisterTalentPage } from '@/pages/auth/Profile';
import { ChatConversationPage, ChatPage } from '@/pages/ChatPage';
import ClassApplyPage from '@/pages/ClassApplyPage/ClassApplyPage';
import ClassDetailPage from '@/pages/ClassDetailPage/ClassDetailPage';
import { ClassExploreCategoryPage, ClassExploreClassListPage, ClassExploreGiverListPage, ClassExplorePage } from '@/pages/ClassExplorePage';
import { RegisterClassPage } from '@/pages/ClassRegisterPage';
import { GiverDetailPage } from '@/pages/GiverDetailPage';
import HomePage from '@/pages/HomePage';
import {
  OneMonthApplyPage,
  OneMonthCompletePage,
  OneMonthMainPage,
  OneMonthTalentRegisterPage,
  OneMonthWantTalentPage
} from '@/pages/OneMonthPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/register-talent" element={<RegisterTalentPage />} />
      <Route path="/profile/register-learning-talent" element={<RegisterLearningTalentPage />} />
      <Route path="/one-month/talent" element={<OneMonthTalentRegisterPage />} />
      <Route path="/one-month/want-talent" element={<OneMonthWantTalentPage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route element={<PageLayout/>}>
        <Route path="giver/:id" element={<GiverDetailPage />} handle={{ getTitle: (params: any) => {
          const dummyGivers = [
            { id: 1, username: '@minii' },
            { id: 2, username: '@duckduck' },
          ];
          const giver = dummyGivers.find(g => String(g.id) === params.id);
          return giver ? `${giver.username}` : '';
        }}} />
        <Route path="class/:id" element={<ClassDetailPage />} handle={{ title: "수업 상세 안내" }} />
        <Route path="class/:id/apply" element={<ClassApplyPage />} />
        <Route path="class-explore" element={<ClassExplorePage />} handle={{ title: "재능 탐색" }} />
        <Route path="class-explore/:category" element={<ClassExploreCategoryPage />} handle={{ title: ":category" }} />
        <Route path="class-explore/:category/givers" element={<ClassExploreGiverListPage />} handle={{ title: ":category 재능 기부자" }} />
        <Route path="class-explore/:category/classes" element={<ClassExploreClassListPage />} handle={{ title: ":category 수업 목록" }} />
        <Route path="one-month" element={<OneMonthMainPage />} handle={{ title: "의성 한 달 살이" }} />
        <Route path="one-month/apply" element={<OneMonthApplyPage />} handle={{ title: "신청하기" }} />
        <Route path="one-month/complete" element={<OneMonthCompletePage />} handle={{ title: "완료" }} />
        <Route path="class-register" element={<RegisterClassPage />} />
      </Route>
      {/* Chat 관련 페이지들은 상단바/하단바 없이 풀스크린 */}
      <Route path='chat' element={<ChatPage/>}/>
      <Route path='chat/conversation' element={<ChatConversationPage/>}/>
      <Route path='my-page' element={<MyPage/>}/>
    </>
  )
);

export default router;
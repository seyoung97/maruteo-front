import { useEffect, useState } from 'react';
import RegisterClassForm from '../../components/Class/RegisterClassForm';
import { getMyTalents, type MyTalentsResponse } from '../../services/classGiverExploreServices';

const RegisterClassPage = () => {
  const [talents, setTalents] = useState<MyTalentsResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMyTalents()
      .then((data) => {
        setTalents(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch(() => {
        setTalents([]);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>재능 목록을 불러올 수 없습니다.</div>;

  return <RegisterClassForm talents={talents} />;
};

export default RegisterClassPage; 
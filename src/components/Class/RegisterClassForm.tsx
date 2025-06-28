import React, { useState, useEffect } from 'react';
import { registerClass } from '../../services/classGiverExploreServices';
import { Box, Text, Avatar, Flex } from '@chakra-ui/react';

interface RegisterClassFormProps {
  talents: { id: string; name: string }[];
}

const RegisterClassForm: React.FC<RegisterClassFormProps> = ({ talents }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    place: '',
    unavailable: '',
    talentId: '',
    media: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [showTalentSelect, setShowTalentSelect] = useState(false);
  const [giver, setGiver] = useState<GiverProfile | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTalentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, talentId: e.target.value });
    setShowTalentSelect(false);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, media: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await registerClass(form);
    setSubmitting(false);
    // TODO: 등록 후 마이페이지로 이동 또는 알림
  };

  useEffect(() => {
    // 실제 API 엔드포인트/파라미터는 명세서 참고
    fetch('/api/giver/123')
      .then(res => res.json())
      .then(data => setGiver(data));
  }, []);

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 16 }}>
      <h2 style={{ marginBottom: 16 }}>수업 등록</h2>
      {/* 홍보 미디어 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>홍보 영상/사진</label>
        <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
      </div>
      {/* 수업명 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>수업명</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="수업명" style={{ width: '100%' }} required />
      </div>
      {/* 수업 설명 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>수업 설명</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="수업 설명" style={{ width: '100%' }} required />
      </div>
      {/* 희망 장소 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>희망 장소</label>
        <input name="place" value={form.place} onChange={handleChange} placeholder="희망 장소" style={{ width: '100%' }} />
      </div>
      {/* 안되는 요일/시간 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>안되는 요일/시간</label>
        <input name="unavailable" value={form.unavailable} onChange={handleChange} placeholder="예: 월요일 오전, 금요일 오후" style={{ width: '100%' }} />
      </div>
      {/* 관련 재능 선택 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>관련 재능</label>
        <button type="button" style={{ marginBottom: 8, background: '#B6E2B6', color: '#222', padding: '6px 12px', borderRadius: 8, border: 'none', fontWeight: 600 }} onClick={() => setShowTalentSelect(!showTalentSelect)}>
          {form.talentId ? talents.find(t => t.id === form.talentId)?.name + ' 변경' : '관련 재능 선택'}
        </button>
        {showTalentSelect && (
          <select name="talentId" value={form.talentId} onChange={handleTalentChange} style={{ width: '100%', marginBottom: 8 }} required>
            <option value="">재능 선택</option>
            {talents.map(talent => (
              <option key={talent.id} value={talent.id}>{talent.name}</option>
            ))}
          </select>
        )}
      </div>
      <Box mb={3}>
        <Text fontWeight="bold" color="green.600" mb={1}>재능 기부자(강사) 프로필</Text>
        {giver && (
          <Flex align="center" gap={3} border="1px solid #B6E2B6" borderRadius={12} p={3} mb={2} bg="white" boxShadow="sm">
            <Avatar src={giver.profileImage} name={giver.name} size="lg" border="2px solid #B6E2B6" />
            <Box>
              <Flex align="center" gap={2}>
                <Text fontWeight="bold" fontSize="lg">{giver.name}</Text>
                <Text color="gray.500" fontSize="sm">{giver.userId}</Text>
                <Flex align="center" gap={1} ml={2}>
                  <Text fontSize="md" color="#FACC15">⭐️</Text>
                  <Text fontWeight="bold" fontSize="md">{giver.rating}</Text>
                </Flex>
              </Flex>
              <Text color="gray.700" fontSize="sm" mt={1}>{giver.introduction}</Text>
            </Box>
          </Flex>
        )}
      </Box>
      <button type="submit" disabled={submitting} style={{ width: '100%', background: '#B6E2B6', color: '#222', padding: 12, borderRadius: 8 }}>
        {submitting ? '등록 중...' : '수업 등록'}
      </button>
    </form>
  );
};

export default RegisterClassForm; 
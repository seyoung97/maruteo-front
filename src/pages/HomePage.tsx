import { Box } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from '../components/ui/Carousel';
import { TALENT_CATEGORIES } from "../data/talentData";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <Box>
      {/* 상단 카테고리별 인기수업 Carousel */}
      
      {/* 상단 카테고리 탭 */}
      <CategoryTabContainer>
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          className="category-swiper"
          grabCursor={true}
          touchRatio={1}
        >
          <SwiperSlide key="all">
            <CategoryTab
              isActive={selectedCategory === ''}
              onClick={() => setSelectedCategory('')}
            >
              전체
            </CategoryTab>
          </SwiperSlide>
          {TALENT_CATEGORIES.map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryTab
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </CategoryTab>
            </SwiperSlide>
          ))}
        </Swiper>
      </CategoryTabContainer>

      {/* 메인 콘텐츠 영역 */}
      <MainContent>
      <Carousel />
      </MainContent>
    </Box>
  )
}

// Styled Components
const CategoryTabContainer = styled.div`
  background: white;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .category-swiper {
    padding: 0 20px;
    overflow: hidden;
    
    .swiper-wrapper {
      display: flex;
      align-items: center;
      transition-timing-function: linear;
    }
    
    .swiper-slide {
      width: auto !important;
      flex-shrink: 0;
    }
    
    /* Swiper 기본 스타일 추가 */
    .swiper-container {
      width: 100%;
      height: 100%;
    }
  }
`;

const CategoryTab = styled.button<{ isActive: boolean }>`
  background: ${props => props.isActive ? '#000' : 'transparent'};
  color: ${props => props.isActive ? '#fff' : '#666'};
  border: ${props => props.isActive ? '1px solid #000' : '1px solid #e0e0e0'};
  border-radius: 20px;
  padding: 10px 18px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    background: ${props => props.isActive ? '#333' : '#f5f5f5'};
  }

  &:last-child {
    margin-right: 20px; /* 마지막 탭에 여백 추가 */
  }
`;

const MainContent = styled.div`
  background: #f9f9f9;
  min-height: calc(100vh - 80px);
`;

export default HomePage;
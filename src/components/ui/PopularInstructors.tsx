import { Avatar, Box, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

// 인기 강사 더미 데이터
const popularInstructors = [
  { id: 1, name: '이덕배', image: '/elder1.png', rating: 4.8, classCount: 12 },
  { id: 2, name: '김춘자', image: '/choonja.png', rating: 4.7, classCount: 8 },
  { id: 3, name: '이송자', image: '/choonja.png', rating: 4.9, classCount: 15 },
  { id: 4, name: '이영자', image: '/choonja.png', rating: 4.6, classCount: 10 },
  { id: 5, name: '박남식', image: '/namsik.png', rating: 4.8, classCount: 11 },
];

interface PopularInstructorsProps {
  title?: string;
}

const PopularInstructors = ({ title = "인기 강사" }: PopularInstructorsProps) => {
  return (
    <Box>
      <Text textStyle="xl" fontWeight="bold" color="#000" ml={1} mb={3} mt={6}>
        {title}
      </Text>
      <InstructorSwiperContainer>
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          className="instructor-swiper"
          grabCursor={true}
          touchRatio={1}
        >
          {popularInstructors.map((instructor) => (
            <SwiperSlide key={instructor.id}>
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center"
                padding="16px 12px"
                
              >
                <Avatar.Root shape="full" size="2xl" mb={2}>
                  <Avatar.Fallback name={instructor.name} />
                  <Avatar.Image src={instructor.image} />
                </Avatar.Root>
                <Text fontWeight="bold" fontSize="sm" textAlign="center">
                  {instructor.name}
                </Text>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </InstructorSwiperContainer>
    </Box>
  );
};

// Styled Components
const InstructorSwiperContainer = styled.div`
  .instructor-swiper {
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
  }
`;

export default PopularInstructors;
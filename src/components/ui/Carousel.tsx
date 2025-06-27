import { Image, Text } from "@chakra-ui/react";
import styled from "styled-components";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// 더미 인기수업 데이터
const dummyPopularClasses = [
  {
    id: 1,
    title: '여름을 향해 걷는 러닝 클래스',
    description: 'STEP INTO SUMMER',
    image: '/public/one-month-main.png',
  },
  {
    id: 2,
    title: '감성 사진 클래스',
    description: '감성을 담아보세요',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    id: 3,
    title: '홈카페 마스터 클래스',
    description: '나만의 홈카페',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
];

const Carousel = () => {
  return (
    <CarouselWrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        style={{ width: '100%', height: '100%' }}
      >
        {dummyPopularClasses.map((item) => (
          <SwiperSlide key={item.id}>
            <SlideBox>
              <ImageBox>
                <Image src={item.image} alt={item.title} objectFit="cover" w="100%" h="100%" borderRadius="xl" />
                <SlideTextBox>
                  <SlideTitle>{item.description}</SlideTitle>
                </SlideTextBox>
              </ImageBox>
              <SlideLabel>{item.title}</SlideLabel>
            </SlideBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  aspect-ratio: 16/7;
  margin: 0 auto 24px auto;
  position: relative;
  background: #f5f5f5;
  border-radius: 24px;
  overflow: hidden;
`;

const SlideBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
`;

const SlideTextBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 32px 24px 24px 24px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%);
  border-radius: 0 0 24px 24px;
`;

const SlideTitle = styled.div`
  color: #fff;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
`;

const SlideLabel = styled(Text)`
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
`;

export default Carousel; 
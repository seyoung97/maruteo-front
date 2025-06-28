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
    title: '의성 마늘 불고기',
    description: '의성 마늘 불고기',
    image: '/public/bulgoki.png',
  },
  {
    id: 2,
    title: '할머니표 마늘 찜닭',
    description: '할머니표 마늘 찜닭',
    image: '/public/jjimdark.png',
  },
  {
    id: 3,
    title: '흑마늘 삼계탕',
    description: '흑마늘 삼계탕',
    image: '/public/chicken.png',
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
  height: 320px;
  aspect-ratio: 16/7;
  margin: 0 auto 24px auto;
  position: relative;
  background: #f5f5f5;
  border-radius: 24px;
  overflow: hidden;
`;

const SlideBox = styled.div`
  width: 100%;
  height: 320px;
  position: relative;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 320px;
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
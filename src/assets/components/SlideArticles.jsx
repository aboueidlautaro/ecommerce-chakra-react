import { Box, Flex } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  FreeMode,
} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import config from "../services/config";
import ButtonSwiper from "./ButtonSwiper";
import CardArticle from "./CardArticle";

function SlideArticles(results = []) {
  const [swiperRef, setSwiperRef] = useState(<Swiper />);

  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  const { domain } = config;

  return (
    <Flex
      margin={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"90%"}
    >
      <ButtonSwiper content={<IoIosArrowBack />} onClick={handleLeftClick} />
      <Box
        borderRadius={8}
        boxShadow={"xl"}
        w={"90%"}
        h={406}
        bg={"white"}
        zIndex={1}
      >
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            FreeMode,
          ]}
          autoplay={{
            delay: 2500,
          }}
          freeMode={true}
          loop={true}
          onSwiper={setSwiperRef}
          pagination={{
            clickable: true,
          }}
          centeredSlidesBounds={true}
          centeredSlides={true}
          watchOverflow={true}
          direction={"horizontal"}
          spaceBetween={10}
          centerInsufficientSlides={true}
          slidesPerView={1}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            680: {
              slidesPerView: 2.2,
            },
            1144: {
              slidesPerView: 3.2,
            },
            1400: {
              slidesPerView: 4.2,
            },
            1500: {
              slidesPerView: 5.2,
            },
            2000: {
              slidesPerView: 5.2,
            },
          }}
        >
          {results.results.map((result) => {
            return (
              <SwiperSlide className="swiperslide" key={result.id}>
                <CardArticle
                  title={result.title}
                  tag={result.tag}
                  price={result.price}
                  src={`${domain}/uploads/${result.image}`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <ButtonSwiper
        content={<IoIosArrowForward />}
        onClick={handleRightClick}
      />
    </Flex>
  );
}

export default SlideArticles;

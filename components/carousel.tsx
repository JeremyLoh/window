import React, { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"

export type CarouselProps = {
  items: Array<JSX.Element>
  keys: Array<string>
}

const Carousel: FC<CarouselProps> = (props) => {
  const swiperStyle: Object = {
    "--swiper-navigation-size": "3rem",
    "--swiper-navigation-top-offset": "3%",
    "--swiper-navigation-sides-offset": "5rem",
  }
  return (
    <div className="w-full">
      <Swiper
        style={swiperStyle}
        modules={[Navigation]}
        centeredSlides={true}
        watchSlidesProgress={true}
        slidesPerView={1}
        spaceBetween={18}
        navigation
      >
        {props.items.map((item, index) => (
          <SwiperSlide key={props.keys[index]}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel




import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const testimonialsData = [
  {
    image: "https://i.ibb.co.com/n4NyhKJ/posing-athletes-holding-weights.jpg",
    name: "Product 1",
    description: "This is a description for product 1. It offers high-quality materials and great value for money.",
    rating: "⭐⭐⭐⭐☆"
  },
  {
    image: "https://i.ibb.co.com/n4NyhKJ/posing-athletes-holding-weights.jpg",
    name: "Product 2",
    description: "Product 2 is a top-rated gadget, known for its innovative design and performance.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    image: "https://i.ibb.co.com/n4NyhKJ/posing-athletes-holding-weights.jpg",
    name: "Product 3",
    description: "An advanced version of the previous model, this product offers improved features and enhanced durability.",
    rating: "⭐⭐⭐⭐☆"
  },
  {
    image: "https://i.ibb.co.com/n4NyhKJ/posing-athletes-holding-weights.jpg",
    name: "Product 4",
    description: "This product combines functionality with aesthetics, providing both value and style.",
    rating: "⭐⭐⭐⭐"
  },
  {
    image: "https://i.ibb.co.com/n4NyhKJ/posing-athletes-holding-weights.jpg",
    name: "Product 5",
    description: "A must-have for tech enthusiasts, this product is packed with cutting-edge technology and features.",
    rating: "⭐⭐⭐⭐⭐"
  }
];

function TechnicalManual() {
  return (
    <div className="flex flex-col min-h-screen p-12 lora">
      <h1 className="font-semibold text-[#0A3161] text-[34px]">Technical manuals</h1>
      <div className="flex-1 bg-[#E3EDF9] rounded-xl">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full"
          loop={true}
        >
          {testimonialsData.map((data) => (
            <SwiperSlide key={data.name}>
              <div className="text-center">
                <div className="flex justify-center">
                  <img
                    className="w-[100px] h-[100px] rounded-full"
                    src={data.image}
                    alt={data.name}
                  />
                </div>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <div>{data.rating}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TechnicalManual;
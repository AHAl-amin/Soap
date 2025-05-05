// import React, { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import { BsArrowRight } from "react-icons/bs";
// import { BsArrowLeft } from "react-icons/bs";

// const testimonialsData = [
//   {
//     file: "PDF",

//   },
//   {
//     file: "PDF",

//   },
//   {
//     file: "PDF",

//   },
//   {
//     file: "PDF",

//   },
//   {
//     file: "PDF",

//   },
//   {
//     file: "PDF",

//   },
//   {
//     file: "PDF",

//   },

// ];

// function TechnicalManual() {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   return (
//     <div className="flex flex-col min-h-screen p-10 lora relative">
//       <h1 className="font-semibold text-[#0A3161] text-[34px] mb-10">Technical manuals</h1>

//       {/* Custom navigation buttons */}
//       <div className="absolute z-10 top-16 right-10">
//         <button ref={nextRef} className="bg-[#A4C3E9] text-[#0A3161] cursor-pointer px-3 py-3 rounded-full shadow-md">

//           <BsArrowRight />


//         </button>
//       </div>
//       <div className="absolute z-10 top-16 right-24">


//         <button ref={prevRef} className="bg-[#A4C3E9] text-[#0A3161] px-3 py-3 cursor-pointer rounded-full shadow-md">
//           <BsArrowLeft />
//         </button>
//       </div>

//       <div className="flex-1 bg-[#E3EDF9] rounded-xl py-10 flex items-center">
//         <Swiper
//           navigation={{
//             prevEl: prevRef.current,
//             nextEl: nextRef.current,
//           }}
//           onInit={(swiper) => {
//             swiper.params.navigation.prevEl = prevRef.current;
//             swiper.params.navigation.nextEl = nextRef.current;
//             swiper.navigation.init();
//             swiper.navigation.update();
//           }}
//           modules={[Navigation]}
//           className="mySwiper h-full"
//           loop={true}
//         >
//           {testimonialsData.map((data) => (
//             <SwiperSlide key={data.name}>
//               <div className="text-center px-6 ">
//                 <h1 className='text-[#0A3161] lora text-[100px]'>{data.file}</h1>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default TechnicalManual;

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

const testimonialsData = [
  { file: 'PDF' },
  { file: 'PDF' },
  { file: 'PDF' },
  { file: 'PDF' },
  { file: 'PDF' },
  { file: 'PDF' },
  { file: 'PDF' },
];

function TechnicalManual() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Track the current slide index (1-based)

  const totalSlides = testimonialsData.length; // Total number of slides

  // Update the index when the slide changes
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex + 1); // Swiper's realIndex is 0-based, so add 1
  };

  return (
    <div className="flex flex-col min-h-screen p-10 lora relative">
      <h1 className="font-semibold text-[#0A3161] text-[34px] mb-10">Technical manuals</h1>

      {/* Display current slide number and total slides */}
      <div className="absolute z-10 top-16 right-10 flex items-center space-x-4">
        <span className="text-[#0A3161] text-[34px] mr-10">{`${currentIndex}/${totalSlides}`}</span>
        <button
          ref={nextRef}
          className="bg-[#A4C3E9] text-[#0A3161] px-3 py-3 cursor-pointer rounded-full shadow-md"
        >
          <BsArrowLeft />
        </button>
        <button
          ref={prevRef}
          className="bg-[#A4C3E9] text-[#0A3161] cursor-pointer px-3 py-3 rounded-full shadow-md"
        >
          <BsArrowRight />
        </button>
      </div>

      <div className="flex-1 bg-[#E3EDF9] rounded-xl py-10 flex items-center">
        <Swiper
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            swiperRef.current = swiper; // Store swiper instance
          }}
          onSlideChange={handleSlideChange} // Listen for slide changes
          modules={[Navigation]}
          className="mySwiper h-full"
          loop={true}
        >
          {testimonialsData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="text-center px-6">
                <h1 className="text-[#0A3161] lora text-[100px]">{data.file}</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TechnicalManual;

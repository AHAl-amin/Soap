


import  { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

const testimonialsData = [
  { file: '/1.jpg' },
  { file: '/2.jpg' },
  { file: '/3.jpg' },
  { file: '/4.jpg' },
  { file: '/5.jpg' },
  { file: '/6.jpg' },
  { file: '/7.jpg' },
  { file: '/8.jpg' },
  { file: '/9.jpg' },
  { file: '/10.jpg' },
  { file: '/11.jpg' },
  { file: '/12.jpg' },
  { file: '/13.jpg' },
  { file: '/14.jpg' },
  { file: '/15.jpg' },
  { file: '/16.jpg' },
  { file: '/17.jpg' },
  { file: '/18.jpg' },
  { file: '/19.jpg' },
  { file: '/20.jpg' },
  { file: '/21.jpg' },
  { file: '/22.jpg' },
  { file: '/23.jpg' },
  { file: '/24.jpg' },
  { file: '/25.jpg' },
  { file: '/26.jpg' },
  { file: '/27.jpg' },
  { file: '/28.jpg' },
  { file: '/29.jpg' },
  { file: '/30.jpg' },
  { file: '/31.jpg' },
  { file: '/32.jpg' },
  { file: '/33.jpg' },
  { file: '/34.jpg' },
  { file: '/35.jpg' },
  { file: '/36.jpg' },
  { file: '/37.jpg' },
  { file: '/38.jpg' },
  { file: '/39.jpg' },
  { file: '/40.jpg' },
  { file: '/41.jpg' },
  { file: '/42.jpg' },
  { file: '/43.jpg' },
  { file: '/44.jpg' },
  { file: '/45.jpg' },
  { file: '/46.jpg' },
  { file: '/47.jpg' },
  { file: '/48.jpg' },
  { file: '/49.jpg' },
  { file: '/50.jpg' },
  { file: '/51.jpg' },
  { file: '/52.jpg' },
  { file: '/53.jpg' },
  { file: '/54.jpg' },
  { file: '/55.jpg' },
  { file: '/56.jpg' },
  { file: '/57.jpg' },
  { file: '/58.jpg' },
  { file: '/59.jpg' },
  { file: '/60.jpg' },
  { file: '/61.jpg' },
  { file: '/62.jpg' },
  { file: '/63.jpg' },
  { file: '/64.jpg' },
  { file: '/65.jpg' },
  { file: '/66.jpg' },
  { file: '/67.jpg' },
  { file: '/68.jpg' },
  { file: '/69.jpg' },
  { file: '/70.jpg' },
  { file: '/71.jpg' },
  { file: '/72.jpg' },
  { file: '/73.jpg' },
  { file: '/74.jpg' },
  { file: '/75.jpg' },
  { file: '/76.jpg' },
  { file: '/77.jpg' },
  { file: '/78.jpg' },
  { file: '/79.jpg' },
  { file: '/80.jpg' },
  { file: '/81.jpg' },
  { file: '/82.jpg' },
  { file: '/83.jpg' },
  { file: '/84.jpg' },
  { file: '/85.jpg' },
  { file: '/86.jpg' },
  { file: '/87.jpg' },
  { file: '/88.jpg' },
  { file: '/89.jpg' },
  { file: '/90.jpg' },
  { file: '/91.jpg' },
  { file: '/92.jpg' },
  { file: '/93.jpg' },
  { file: '/94.jpg' },
  { file: '/95.jpg' },
  { file: '/96.jpg' },
  { file: '/97.jpg' },
  { file: '/98.jpg' },
  { file: '/99.jpg' },
  { file: '/100.jpg' },
  { file: '/101.jpg' },
  { file: '/102.jpg' },
  { file: '/103.jpg' },
  { file: '/104.jpg' },
  { file: '/105.jpg' },
  { file: '/106.jpg' },
  { file: '/107.jpg' },
  { file: '/108.jpg' },
  { file: '/109.jpg' },
  { file: '/110.jpg' },
  { file: '/111.jpg' },
  { file: '/112.jpg' },
  { file: '/113.jpg' },
  { file: '/114.jpg' },
  { file: '/115.jpg' },
  { file: '/116.jpg' },
];

function TechnicalManual() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const totalSlides = testimonialsData.length;

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex + 1);
  };

  return (
    <div className="flex flex-col max-h-screen p-10 lora relative mx-auto md:w-[80%] w-full">
      <h1 className="font-semibold text-[#0A3161] text-[34px] mb-10">Technical manuals</h1>

      {/* Slide indicator and navigation */}
      <div className="absolute z-10 md:top-16 top-22 right-10 flex items-center space-x-4">
        <span className="text-[#0A3161] text-[34px] mr-10">{`${currentIndex}/${totalSlides}`}</span>
   
        <button
          ref={prevRef}
          className="bg-[#A4C3E9] text-[#0A3161] px-3 py-3 cursor-pointer rounded-full shadow-md hover:bg-[#8ab3e0] transition-colors"
          aria-label="Next slide"
        >
          <BsArrowLeft size={24} />
        </button>

        <button
          ref={nextRef}
          className="bg-[#A4C3E9] text-[#0A3161] px-3 py-3 cursor-pointer rounded-full shadow-md hover:bg-[#8ab3e0] transition-colors"
          aria-label="Previous slide"
        >
          
          <BsArrowRight  size={24} />
        </button>
      </div>

      {/* Swiper with image slides */}
      <div className="flex-1 bg-[#E3EDF9] rounded-xl md:mt-0 md:py-10 py-4 my-10">
        <Swiper
          navigation={{
            prevEl: nextRef.current, // Left arrow (nextRef) moves to previous slide
            nextEl: prevRef.current, // Right arrow (prevRef) moves to next slide
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = nextRef.current;
            swiper.params.navigation.nextEl = prevRef.current;
          }}
          onSlideChange={handleSlideChange}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
          loop={true}
          slidesPerView={1}
        >
          {testimonialsData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="text-center px-6">
                <img
                  src={data.file}
                  alt={`Manual ${index + 1}`}
                  className="mx-auto md:w-[45%] w-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TechnicalManual;
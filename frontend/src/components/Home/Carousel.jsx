import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='bg-gradient-to-br from-sky-950 '>
    <div className='w-10/12 md:w-11/12 m-auto '>
      <div className='mt-1'>
        <Slider {...settings}>       
          {data.map((d, index) => (
            <div key={index} className='flex'>
              <img className='p-1 w-[100%] h-[200px] md:h-[300px] rounded-xl' src={d.img} alt="" />
            </div>
          ))}   
        </Slider>
  
      </div>
    </div>
    </div>
  );
}

const data = [
  {
    img : "https://media.istockphoto.com/id/1015650138/photo/india-flag-with-ballot-box.jpg?s=612x612&w=0&k=20&c=_OlLiMolADi5Q7tqkPUxlKDCgOgjaAcbjNO3BoQx-EQ="
  },
  {
    img: "https://media.istockphoto.com/id/1152403495/photo/voter-sign-india.webp?b=1&s=170667a&w=0&k=20&c=bJe1dF05Jf7EmiEzFDkz6NH_Ej5EZKCIRMbMweX8oA0="
    
  },
  {
    img: "https://images.unsplash.com/photo-1534293230397-c067fc201ab8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dm90aW5nfGVufDB8fDB8fHww"
  },
  {
    img: "https://media.istockphoto.com/id/1175482282/photo/old-indian-women-showing-the-ink-mark-on-their-fingers-after-voting-karnataka-india.webp?b=1&s=170667a&w=0&k=20&c=1D1pwRKnGvjRXCYmrozmD0-R6YaN_R82I3VYdTQhXj4="
  },
  {
    img: "https://media.istockphoto.com/id/2093958214/photo/indian-general-election-2024-or-lok-sabha-election.webp?b=1&s=170667a&w=0&k=20&c=iKkk2NIJncCtRtIrjXUFcxBIE29dZv-_FAdz3Pkz2xM="
  },
]

export default Carousel;

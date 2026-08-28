import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

const Carousel = ({
  children,
  perView = 4,
  spacing = 20,
  loop = true,
  showDots = true,
  showArrows = false,
  breakpoints,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = React.Children.toArray(children);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop,
    slides: { perView, spacing },
    breakpoints,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="keen-carousel">
      {showArrows && (
        <button
          className="keen-arrow keen-arrow-prev"
          onClick={() => instanceRef.current?.prev()}
          aria-label="Previous"
        >
          &#10094;
        </button>
      )}
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="keen-slider__slide"
            style={{ padding: `0 ${spacing / 2}px` }}
          >
            {slide}
          </div>
        ))}
      </div>
      {showArrows && (
        <button
          className="keen-arrow keen-arrow-next"
          onClick={() => instanceRef.current?.next()}
          aria-label="Next"
        >
          &#10095;
        </button>
      )}
      {showDots && slides.length > 1 && (
        <div className="keen-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`keen-dot${currentSlide === idx ? " active" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

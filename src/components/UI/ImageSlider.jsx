import { Splide, SplideSlide } from '@splidejs/react-splide';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ImageSlider({ images }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full h-[40vh]"
    >
      <Splide
        options={{
          type: 'slide',
          rewind: true,
          autoplay: true,
          interval: 3000,
          speed: 1000,
          pagination: false,
          arrows: false,
          perPage: 1,
          width: '100%',
          height: '40vh',
          gap: '0px',
          drag: true,
          classes: {
            track: '!overflow-hidden',
          }
        }}
      >
        {images.map((img, index) => (
          <SplideSlide key={index}>
            <div className="w-full h-full">
              <LazyLoadImage
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                effect="blur"
                threshold={200}
                placeholderSrc="/placeholder.jpg"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </motion.div>
  );
}
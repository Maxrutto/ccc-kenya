import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/core';
import PropTypes from 'prop-types';

export default function ImageSlider({ images }) {
    return (
        <Splide
            options={{
                type: 'fade',
                rewind: true,
                autoplay: true,
                interval: 4000,
            }}
        >
            {images.map((image, index) => (
                <SplideSlide key={index}>
                    <img
                        src={image.url}
                        alt={image.alt}
                        className='w-full h-[60vh] object-cover'
                        loading='lazy'
                    />
                </SplideSlide>
            ))}
        </Splide>
    );
}

ImageSlider.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
};
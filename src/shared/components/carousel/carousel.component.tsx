import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { EnvironmentThumbnail, EnvironmentThumbnailProps } from "../environment-thumbnail/environment-thumbnail.component";
import "./carousel.component.css";

interface CoronaCarouselProps {
    thumbnails: EnvironmentThumbnailProps[];
}

export const CoronaCarousel: React.FC<CoronaCarouselProps> = (props) => {
    const [carouselPosition, setCarouselPosition] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselInnerRef = useRef(null);

    const itemWidth = 667;
    const totalThumbnails = props.thumbnails.length;

    const adjustedThumbnails = [
        ...props.thumbnails.slice(-3),
        ...props.thumbnails,
        ...props.thumbnails.slice(0, 3)
    ];

    useEffect(() => {
        if (!carouselInnerRef.current) return;
        setCarouselPosition(-itemWidth*3);
    }, []);

    const onPrevButtonClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCarouselPosition((prev) => prev + itemWidth);
    };

    const onNextButtonClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCarouselPosition((prev) => prev - itemWidth);
    };

    const onTransitionEnd = () => {
        setIsTransitioning(false);
        if (carouselPosition >= 0) {
            setCarouselPosition(-itemWidth * totalThumbnails);
        } else if (carouselPosition <= -itemWidth * (totalThumbnails + 3)) {
            setCarouselPosition(-itemWidth*3);
        }
    };

    return (
        <div className="carousel-content">
            <button className="corona-carousel-btn-left" onClick={onPrevButtonClick}>
                <FaChevronLeft />
            </button>
            <div className="corona-carousel-slide rounded">
                <div ref={carouselInnerRef} id="carouselInner" className="corona-carousel-inner" style={{ transform: `translateX(${carouselPosition}px)`, transition: isTransitioning ? 'transform 0.5s' : 'none' }} onTransitionEnd={onTransitionEnd}>
                    {adjustedThumbnails.map((thumbnail, index) => (
                        <EnvironmentThumbnail
                            key={index}
                            name={thumbnail.name}
                            image={thumbnail.image}
                            id={thumbnail.id}
                            onEvents={thumbnail.onEvents} />
                    ))}
                </div>
            </div>
            <button className="corona-carousel-btn-rigth" onClick={onNextButtonClick}>
                <FaChevronRight />
            </button>
        </div>
    );
};

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { EnvironmentThumbnail, EnvironmentThumbnailProps } from "../environment-thumbnail/environment-thumbnail.component";
import "./carousel.component.css"
import { useEffect, useState } from "react";


interface CoronaCarouselProps {
    thumbnails: EnvironmentThumbnailProps[]
}


export const CoronaCarousel: React.FC<CoronaCarouselProps> = (props) => {

    const [carouselMovementDistance, setCarouselMovementDistance] = useState(0);
    const [carouselPosition, setCarouselPosition] = useState(0);
    const [carouselWidth, setCarouselWidth] = useState(0);

    const [nextButtonVisible, setNextButtonVisible] = useState(true);
    const [prevButtonVisible, setPrevButtonVisible] = useState(false);


    useEffect(() => {

        let carouselInnerRef = document.getElementById("carouselInner");

        if (!carouselInnerRef)
            return;

        const elementStyle = window.getComputedStyle(carouselInnerRef);
        const width = parseInt(elementStyle.getPropertyValue('width'));
        let itemWidth = width / props.thumbnails.length;

        setCarouselWidth(width ? width - itemWidth * 2 : 0);
        setCarouselMovementDistance(itemWidth);
        setNextButtonVisible(true);
        
    }, [props]);


    useEffect(() => {
        
        setPrevButtonVisible(carouselPosition < 0);
        setNextButtonVisible(carouselPosition > -carouselWidth)

    }, [carouselPosition]);
    

    const onPrevButtonClick = () => {

        if (carouselPosition == 0)
            return;

        setCarouselPosition(carouselPosition + carouselMovementDistance);
    }

    const onNextButtonClick = () => {

        if (carouselPosition < -carouselWidth)
            return;

        setCarouselPosition(carouselPosition - carouselMovementDistance);
    }


    return(
        <div className="carousel-content">
            <button className={`corona-carousel-btn ${prevButtonVisible ? "" : "invisible"}`} onClick={onPrevButtonClick}>
                <FaChevronLeft/>
            </button>
            <div className="corona-carousel-slide rounded">
                <div id="carouselInner" className="corona-carousel-inner" style={{ transform: `translateX(${carouselPosition}px)` }}>
                    {
                        props.thumbnails.map(thumbnail => {
                            return <EnvironmentThumbnail
                                        name={thumbnail.name}
                                        image={thumbnail.image}
                                        id={thumbnail.id}
                                        onEvents={thumbnail.onEvents}/>
                        })
                    }
                </div>
            </div>
            <button className={`corona-carousel-btn right ${nextButtonVisible ? "" : "invisible"}`} onClick={onNextButtonClick}>
                <FaChevronRight/>
            </button>
        </div>
    );
}
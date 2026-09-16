import { useState, useEffect, useRef } from "react";
import "../styling/card.css";

function Gallery({ item }) {
    // const [imageIndex, setImageIndex] = useState(0);

    const [expanded, setExpanded] = useState(false);
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const assetBase = `${import.meta.env.BASE_URL}assets/`;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);
    // const handleNext = (e) => {
    //     e.stopPropagation();
    //     setImageIndex((prev) => (prev + 1) % images.length);
    // };

    // const handlePrev = (e) => {
    //     e.stopPropagation();
    //     setImageIndex((prev) => (prev - 1 + images.length) % images.length);
    // };

    return (
        <div
            ref={cardRef}
            className={`card ${isVisible ? "visible" : ""}`}
        >
            <div className="card-title">
                <div className="card-circle-container">
                    <div className="card-circle"></div>
                    <div className="card-circle"></div>
                </div>
                <span>{`Project ${item.index}`}</span>
            </div>

            <div className="card-content gallery-content">
                <div className="card-description">
                    <h1>{item.title}</h1>
                    <span>
                        {item.description}
                    </span>
                </div>


                <div className="gallery">
                    <div className="gallery-main">
                        <img
                            // src={`${assetBase}${images[imageIndex]}`}
                            src={`${assetBase}${item.image}`}
                            alt="gallery"
                            className="gallery-image"
                        />
                    </div>
                </div>
            </div>
            {expanded && item.description2 && (
                <div className="card-description card-description-expanded">
                    <span>{item.description2}</span>
                </div>
            )}
            <div className="card-buttons">
                {!expanded ? (
                    <button
                        className="button view-more"
                        onClick={() => setExpanded(true)}
                    >
                        <pre>{`View More   >>`}</pre>
                    </button>
                ) : (
                    <button
                        className="button view-less"
                        onClick={() => setExpanded(false)}
                    >
                        <pre>{`View Less   <<`}</pre>
                    </button>
                )}
            </div>


            {/* <div className="gallery-buttons">
                        <button
                            className="gallery-button-left"
                            onClick={handlePrev}
                        >
                            {"<<"}
                        </button>

                        <button
                            className="gallery-button-right"
                            onClick={handleNext}
                        >
                            {">>"}
                        </button>
                    </div> */}


        </div>

    );
}

export default Gallery;

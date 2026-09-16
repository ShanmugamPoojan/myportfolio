import { useState, useEffect, useRef } from "react";
import "../styling/card.css";

function Card({ item }) {
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
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
                <span>
                    {item.section === "projects"
                        ? `Project ${item.index}`
                        : item.section === "home"
                            ? "A small overview of myself"
                            : item.section === "journey"
                                ? `Chapter ${item.index}`
                                : ""}

                </span>
            </div>

            <div className="card-content">
                {item.image &&
                    <div className="card-image">
                        {item?.image?.map((img, index) => (
                            <img
                                key={index}
                                src={`${assetBase}${img}`}
                                alt="card"
                                draggable="false"
                            />
                        ))}
                    </div>
                }

                <div className="card-description">
                    <h1>{item.title}</h1>
                    {item.subTitle &&
                        <p><b>{item.subTitle}</b></p>
                    }
                    {item.duration &&
                        <p><b>{item.duration}</b></p>
                    }
                    <p>
                        {item.description}
                    </p>

                    {expanded && (
                        <br />
                    )}
                    {expanded && (
                        <div className="card-description-expanded">
                            {item.description2 && (
                                <p>
                                    {item.description2}
                                </p>
                            )}
                        </div>
                    )}

                    {
                        item.section === "home" ?
                            <div className="card-buttons home-card-buttons">
                                {/* <button className="button" onClick={() => navigate("/projects")} >
                                    <pre>
                                        {`View My Projects   >>`}
                                    </pre>
                                </button>
                                <button className="button" onClick={() => navigate("/myjourney")} >
                                    <pre>
                                        {`View My Journey   >>`}
                                    </pre>
                                </button> */}
                            </div>
                            :
                            <div className="card-buttons">
                                <button
                                    className="button"
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "View Less <<" : "View More >>"}
                                </button>
                            </div>

                    }
                </div>


            </div>
        </div >
    );
}

export default Card;
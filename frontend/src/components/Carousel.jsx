import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Carousel = ({ autoScrollInterval = 5000 }) => {
    const { sliderInfo } = useStateContext();

    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambiar imagen automáticamente después de un intervalo
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, autoScrollInterval);
        return () => clearInterval(interval);
    }, [currentIndex, autoScrollInterval]);

    const nextSlide = () => {
        if (sliderInfo.images) {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % sliderInfo?.images?.length
            );
        }
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-[800px] overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30 z-20"></div>
            {/* Contenedor de imágenes con transición */}
            <div className="absolute inset-0">
                {sliderInfo?.images &&
                    sliderInfo?.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.image_url}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                                index === currentIndex
                                    ? "opacity-100 z-10"
                                    : "opacity-0 z-0"
                            }`}
                        />
                    ))}
            </div>

            {/* Contenido estático */}
            <div className="absolute inset-0 flex flex-col -bottom-32 justify-center pl-20 max-sm:pl-6 text-white  z-30">
                <div>
                    <h1 className="text-5xl">{sliderInfo?.title}</h1>
                    <p className="text-xl">{sliderInfo?.subtitle}</p>
                </div>
            </div>

            {/* Indicadores */}
            {sliderInfo?.images?.length > 1 && (
                <div className="absolute bottom-16 left-20 max-sm:left-6 flex space-x-2 z-30">
                    {sliderInfo?.images &&
                        sliderInfo?.images?.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-[37px] h-[8px] bg-white transition-opacity duration-300 ${
                                    index === currentIndex
                                        ? "opacity-100"
                                        : "opacity-50"
                                }`}
                            ></button>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;

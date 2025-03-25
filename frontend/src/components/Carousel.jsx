import { useStateContext } from "../contexts/ContextProvider";

const Carousel = () => {
    const { sliderInfo } = useStateContext();

    return (
        <div className="relative w-full h-[800px] overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50 z-30"></div>
            {/* Contenedor de imágenes con transición */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    src={sliderInfo?.video}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out`}
                />
            </div>

            {/* Contenido estático */}
            <div className="absolute inset-0 flex flex-col -bottom-32 max-w-[1240px] mx-auto justify-center max-sm:pl-6 text-white  z-30">
                <div>
                    <h1 className="text-5xl">{sliderInfo?.title}</h1>
                    <p className="text-xl">{sliderInfo?.subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default Carousel;

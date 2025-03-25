import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStateContext } from "../contexts/ContextProvider";

export default function BrandSlider() {
    const { brandImages } = useStateContext();

    return (
        <div className="w-full max-w-[1240px] mx-auto py-10 px-4">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={3} // Mostramos hasta 6 elementos a la vez
                slidesPerGroup={3} // Avanzamos de 6 en 6
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={false} // Desactivamos el loop para evitar paginación extra
                breakpoints={{
                    480: { slidesPerView: 3, slidesPerGroup: 3 },
                    768: { slidesPerView: 4, slidesPerGroup: 4 },
                    1024: { slidesPerView: 6, slidesPerGroup: 6 },
                    1280: { slidesPerView: 6, slidesPerGroup: 6 },
                }}
                className="h-[180px]"
            >
                {brandImages.map((brand, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <div className="w-[120px] h-[100px] md:w-[184px] md:h-[141px] flex items-center justify-center">
                            <img
                                src={brand.image_url}
                                alt={brand?.name}
                                className="w-full h-full object-contain border grayscale hover:grayscale-0 transition"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Estilos personalizados de la paginación */}
            <style>
                {`
                    .swiper-pagination {
                        display: flex;
                        justify-content: center;
                        bottom: 0px !important;
                        padding-right: 20px;
                    }
                    .swiper-pagination-bullet {
                        width: 35px;
                        height: 6px;
                        border-radius: 0;
                        background: #e0e0e0;
                        opacity: 1;
                        transition: background 0.3s;
                    }
                    .swiper-pagination-bullet-active {
                        background: #b50017;
                    }
                `}
            </style>
        </div>
    );
}

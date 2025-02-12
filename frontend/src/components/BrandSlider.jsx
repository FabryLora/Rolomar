import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner from "../assets/logos/logo-principal.png";

const brands = [
    { name: "Mefin", img: banner },
    { name: "Spaco", img: banner },
    { name: "Bosch", img: banner },
    { name: "Firad", img: banner },
    { name: "Special Diesel", img: banner },
    { name: "Zexel", img: banner },
    { name: "Zexel", img: banner },
    { name: "Zexel", img: banner },
];

export default function BrandSlider() {
    return (
        <div className="w-full pl-20 pr-10 py-10">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 6 },
                }}
                className="px-4 h-[180px]"
            >
                {brands.map((brand, index) => (
                    <SwiperSlide key={index} className="flex">
                        <div className="w-[184px] h-[141px] flex items-center justify-center">
                            <img
                                src={brand.img}
                                alt={brand.name}
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
                        padding-right: 40px
                    }
                    .swiper-pagination-bullet {
                        width: 43px;
                        height: 7px;
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

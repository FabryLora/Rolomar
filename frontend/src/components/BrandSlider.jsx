import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner from "../assets/logos/logo-principal.png";

const brands = [
    { name: "Mefin", img: banner },
    { name: "Spaco", img: banner },
    { name: "Bosch", img: banner },
    { name: "Firad", img: banner },
    { name: "Special Diesel", img: banner },
    { name: "Zexel", img: banner },
];

export default function BrandSlider() {
    return (
        <div className="w-full max-w-4xl mx-auto py-6">
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 5 },
                }}
                className="px-4"
            >
                {brands.map((brand, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img
                            src={brand.img}
                            alt={brand.name}
                            className="w-24 h-auto grayscale hover:grayscale-0 transition"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

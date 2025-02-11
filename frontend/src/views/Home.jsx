import BrandSlider from "../components/BrandSlider";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {
    const { nosotrosInicio } = useStateContext();

    return (
        <div>
            <Carousel />
            <SearchBar />
            <div className="flex flex-row h-[573px]">
                <div className="w-full">
                    <img
                        className="w-full h-full object-cover"
                        src={nosotrosInicio?.image_url}
                        alt=""
                    />
                </div>
                <style>
                    {`
                    .custom-container ul, ol, li, h1, h2, h3,h4,h5,h6 {
                        all: revert;
                    }
                        .custom-container div > span {
                                        font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                                    }
                                    .custom-container  p {
                                        font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                                    }
                    `}
                </style>
                <div className="flex flex-col bg-primary-red w-full">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: nosotrosInicio?.text,
                        }}
                        className="custom-container w-full h-full  prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-white px-20 pt-20"
                    ></div>
                    <button className="h-[41px] w-[181px] bg-white text-primary-red mx-20 mb-10">
                        Más información
                    </button>
                </div>
            </div>
            <BrandSlider />
        </div>
    );
}

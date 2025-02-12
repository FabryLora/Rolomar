import { motion } from "motion/react";
import mision from "../assets/iconos/mision-icon.svg";
import valores from "../assets/iconos/valores-icon.svg";
import vision from "../assets/iconos/vision-icon.svg";
import NosotrosCard from "../components/NosotrosCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Nosotros() {
    const { nosotros, metadatos } = useStateContext();

    const nosotrosInfo = [
        {
            icon: mision,
            title: "Misión",
            text: nosotros?.mision,
        },
        {
            icon: vision,
            title: "Visión",
            text: nosotros?.vision,
        },
        {
            icon: valores,
            title: "Valores",
            text: nosotros?.valores,
        },
    ];

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center my-20 px-20 font-roboto-condensed justify-center w-full h-full">
                {/* Imagen - 50% */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0"
                >
                    <img
                        className="w-full h-auto sm:h-[300px] md:h-[450px] lg:h-[678px] object-cover"
                        src={nosotros?.image_url}
                        alt="¿Quiénes somos?"
                    />
                </motion.div>
                {/* Texto - dinámico */}

                <style>
                    {`
                            .custom-content div > span {
    font-size: 16px !important; /* Cambia 1.25rem a 1rem */
}
    .custom-content {
                        
    }
                            `}
                </style>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col h-full w-full lg:w-1/2 md:max-w-full lg:max-w-none items-center"
                >
                    <div className="flex flex-col gap-6 items-start overflow-y-auto max-h-[678px] w-full">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: nosotros?.text || "",
                            }}
                            className="custom-content font-roboto-condensed px-12 prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full min-w-full max-w-full"
                        ></div>
                    </div>
                </motion.div>
            </div>

            <div className="h-fit w-full bg-special-white flex justify-center pb-20 bg-[#F5F5F5]">
                <div className="w-full px-20">
                    <h2 className="font-bold text-[40px] py-20">
                        ¿Porque elegirnos?
                    </h2>
                    <div className="flex flex-row flex-wrap gap-y-20 justify-between max-lg:justify-center">
                        {nosotrosInfo.map((info, index) => (
                            <NosotrosCard
                                key={index}
                                icon={info.icon}
                                title={info.title}
                                text={info.text}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

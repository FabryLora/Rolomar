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
            <div className="flex flex-col lg:flex-row items-center my-10 mx-auto font-roboto-condensed justify-between max-w-[1240px] h-full">
                {/* Imagen - 50% */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-[600px] h-[511px] flex justify-center items-center mb-6 lg:mb-0"
                >
                    <img
                        className="w-full h-full object-cover"
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
                    className="flex flex-col h-full w-[600px] md:max-w-full lg:max-w-none items-center"
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
                <div className="mx-auto max-w-[1240px]">
                    <h2 className="font-bold text-[40px] py-20">
                        ¿Por que elegirnos?
                    </h2>
                    <div className="flex flex-row flex-wrap gap-y-20 justify-between gap-5">
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

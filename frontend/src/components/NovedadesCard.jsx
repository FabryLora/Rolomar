import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function NovedadesCard({ novedadObject }) {
    const [isOpen, setIsOpen] = useState();

    const truncateString = (str, length) => {
        if (str?.length > length) {
            return str.substring(0, length) + "...";
        }
        return str;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            exit={{ scale: 0 }}
                            className="bg-white w-[80%] h-[90%] flex flex-col gap-4 p-4 overflow-y-auto"
                        >
                            <button
                                className="self-end"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <img
                                className="w-full h-[50%] object-cover"
                                src={novedadObject?.image_url}
                                alt=""
                            />
                            <div>
                                <p className="text-primary-red text-sm font-bold">
                                    {novedadObject?.type?.toUpperCase()}
                                </p>
                                <p className="text-2xl font-bold">
                                    {novedadObject?.title}
                                </p>
                                <p className="break-words whitespace-pre-line">
                                    {novedadObject?.text}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <div className="h-[575px] w-[392px] flex flex-col gap-2">
                <div className="min-h-[392px] w-full">
                    <img
                        className="w-full h-full object-cover"
                        src={novedadObject?.image_url}
                        alt=""
                    />
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-primary-red text-sm font-bold">
                            {novedadObject?.type?.toUpperCase()}
                        </p>
                        <div>
                            <p className="text-2xl font-bold">
                                {novedadObject?.title}
                            </p>
                            <p className="break-words whitespace-pre-line">
                                {truncateString(novedadObject?.text, 120)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        type="button"
                        className="flex flex-row justify-between items-center"
                    >
                        <p className="font-bold">Leer mas</p>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

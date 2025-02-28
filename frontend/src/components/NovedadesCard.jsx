import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NovedadesCard({ novedadObject }) {
    const truncateString = (str, length) => {
        if (str?.length > length) {
            return str.substring(0, length) + "...";
        }
        return str;
    };

    const MotionLink = motion.create(Link);

    return (
        <MotionLink
            to={`/novedades/${novedadObject?.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[392px] flex flex-col gap-2"
        >
            <div className="w-full aspect-[392/575] max-h-[392px] max-md:aspect-[1/1.5]">
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
                    type="button"
                    className="flex flex-row justify-between items-center"
                >
                    <p className="font-bold">Leer más</p>
                    <FontAwesomeIcon icon={faArrowRight} size="lg" />
                </button>
            </div>
        </MotionLink>
    );
}

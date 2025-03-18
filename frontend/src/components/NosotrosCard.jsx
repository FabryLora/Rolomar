import { motion } from "motion/react";

export default function NosotrosCard({ title, text, icon }) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col bg-white w-[392px] h-fit min-h-[457px] px-10 py-20 items-center gap-2"
        >
            <div className=" flex flex-col items-center gap-5">
                <img
                    className="w-[80px] h-[80px] object-contain"
                    src={icon}
                    alt=""
                />
                <h2 className="text-[20px] font-semibold">{title}</h2>
            </div>

            <div className=" flex flex-col overflow-hidden ">
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        </motion.div>
    );
}

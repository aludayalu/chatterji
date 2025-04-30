"use client"

import { motion } from "framer-motion"

export function FeatureCard({ title, description, icon, children, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group"
        >
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-white/5 text-[#9FEF00] group-hover:bg-white/10 transition-colors duration-300">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <p className="text-white/70">{description}</p>
            </div>

            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/5 rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative h-full">{children}</div>
            </div>
        </motion.div>
    )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TextReveal({
    text,
    className,
    highlightClass = "text-white",
    highlightWords = [],
    staggerDelay = 0.03,
}) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    const words = text.split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.01,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.h1 className={className} variants={container} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            {words.map((word, index) => {
                const isHighlighted = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()))

                return (
                    <motion.span
                        key={index}
                        variants={item}
                        className={cn("inline-block", isHighlighted ? highlightClass : "")}
                        style={{ marginRight: "0.3em" }}
                    >
                        {word}
                    </motion.span>
                )
            })}
        </motion.h1>
    )
}

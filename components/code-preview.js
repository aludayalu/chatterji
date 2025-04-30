"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export function CodePreview() {
    const [currentLine, setCurrentLine] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [typedText, setTypedText] = useState("")
    const typingIntervalRef = useRef()
    const cursorRef = useRef(null)

    const code = [
        "pub struct TokenContract {",
        "    admin: Address,",
        "    total_supply: u128,",
        "    balances: Map<Address, u128>,",
        "}",
        "",
        "#[contractimpl]",
        "impl TokenContract {",
        "    pub fn initialize(env: Env, admin: Address, total_supply: u128) -> Self {",
        "        let mut balances = Map::new(&env);",
        "        balances.set(admin.clone(), total_supply);",
        "",
        "        Self {",
        "            admin,",
        "            total_supply,",
        "            balances,",
        "        }",
        "    }",
        "}",
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev + 1) % code.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [code.length])

    useEffect(() => {
        if (currentLine === 20 || currentLine === 24 || currentLine === 25) {
            setIsTyping(true)
            setTypedText("")

            const textToType = code[currentLine]
            let charIndex = 0

            typingIntervalRef.current = setInterval(() => {
                if (charIndex < textToType.length) {
                    setTypedText(textToType.substring(0, charIndex + 1))
                    charIndex++
                } else {
                    clearInterval(typingIntervalRef.current)
                    setIsTyping(false)
                }
            }, 50)
        }

        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current)
            }
        }
    }, [currentLine, code])

    useEffect(() => {
        if (cursorRef.current && currentLine === 25) {
            const lineElement = document.getElementById(`code-line-${currentLine}`)
            if (lineElement) {
                const rect = lineElement.getBoundingClientRect()
                cursorRef.current.style.top = `${rect.top + 2}px`
                cursorRef.current.style.left = `${rect.left + typedText.length * 7.8}px`
            }
        }
    }, [currentLine, typedText])

    return (
        <div className="bg-[#0D1117]/80 border border-white/10 rounded-lg p-4 h-full font-mono text-sm overflow-hidden relative">
            <div className="flex items-center gap-2 mb-3">
                <div className="size-3 rounded-full bg-red-500"></div>
                <div className="size-3 rounded-full bg-yellow-500"></div>
                <div className="size-3 rounded-full bg-green-500"></div>
                <span className="text-white/50 text-xs ml-2">token_contract.rs</span>
            </div>

            <div className="space-y-0.5 relative">
                {code.map((line, index) => (
                    <motion.div
                        id={`code-line-${index}`}
                        key={index}
                        initial={{ opacity: 0.5 }}
                        animate={{
                            opacity: index === currentLine ? 1 : 0.5,
                            color: index === currentLine ? "#fff" : "#aaa",
                            backgroundColor: index === currentLine ? "rgba(255, 255, 255, 0.05)" : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                        className="whitespace-pre rounded px-1"
                    >
                        <span className="text-white/30 mr-4 select-none">{index + 1}</span>
                        {isTyping && index === currentLine ? typedText : line}
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        ref={cursorRef}
                        className="absolute h-5 w-[2px] bg-white"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />
                )}
            </div>
        </div>
    )
}

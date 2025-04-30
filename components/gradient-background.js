"use client"

import { useEffect, useRef } from "react"

export function GradientBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId
        let mouseX = 0
        let mouseY = 0
        let time = 0

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const drawGradient = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.003

            const points = [
                {
                    x: canvas.width * 0.3 + Math.sin(time * 0.5) * 100,
                    y: canvas.height * 0.2 + Math.cos(time * 0.3) * 100,
                    radius: canvas.width * 0.4,
                    color: "rgba(255, 255, 255, 0.02)",
                },
                {
                    x: canvas.width * 0.7 + Math.cos(time * 0.4) * 100,
                    y: canvas.height * 0.5 + Math.sin(time * 0.4) * 100,
                    radius: canvas.width * 0.5,
                    color: "rgba(255, 255, 255, 0.01)",
                },
                {
                    x: mouseX || canvas.width * 0.5,
                    y: mouseY || canvas.height * 0.5,
                    radius: canvas.width * 0.3,
                    color: "rgba(255, 255, 255, 0.02)",
                },
            ]

            points.forEach((point) => {
                const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

                gradient.addColorStop(0, point.color)
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            })

            ctx.strokeStyle = "rgba(255, 255, 255, 0.01)"
            ctx.lineWidth = 1

            const gridSize = 100
            const offsetX = (time * 10) % gridSize
            const offsetY = (time * 5) % gridSize

            for (let x = offsetX; x < canvas.width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, canvas.height)
                ctx.stroke()
            }

            for (let y = offsetY; y < canvas.height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(canvas.width, y)
                ctx.stroke()
            }

            animationFrameId = requestAnimationFrame(drawGradient)
        }

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        window.addEventListener("resize", resizeCanvas)
        window.addEventListener("mousemove", handleMouseMove)

        resizeCanvas()
        drawGradient()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-70" style={{ mixBlendMode: "normal" }} />

            <div className="fixed inset-0 bg-gradient-to-b from-[#0D1117] via-[#0D1117] to-[#0D1117] opacity-80 z-0" />

            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] z-0 pointer-events-none" />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0D1117_70%)] z-0 pointer-events-none" />
        </>
    )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code, Database, ExternalLink, Github, Rocket, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/gradient-background"
import { FeatureCard } from "@/components/feature-card"
import { CodePreview } from "@/components/code-preview"
import { HeroImage } from "@/components/hero-image"
import { LogoCloud } from "@/components/logo-cloud"
import { TextReveal } from "@/components/text-reveal"
import { cn } from "@/lib/utils"

export default function Home() {
    const [scrolled, setScrolled] = useState(false)
    const heroRef = useRef(null)
    const featuresRef = useRef(null)
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-[#0D1117] text-white overflow-hidden">
            <GradientBackground />

            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled ? "bg-[#0D1117]/80 backdrop-blur-md border-b border-white/10" : "bg-transparent",
                )}
            >
                <div className="mx-auto w-full flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 font-medium"
                    >
                        <img src="logo.svg" alt="Calliope" className="h-[45px]" />
                    </motion.div>

                    <nav className="hidden md:flex gap-10">
                        {[
                            { name: "Features", href: "#features" },
                            { name: "Documentation", href: "#docs" },
                            { name: "Examples", href: "#examples" },
                            { name: "Pricing", href: "/pricing" }
                        ].map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * i }}
                            >
                                <Link href={item.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-4"
                    >
                        <Link href="https://github.com/aludyalu/chatterji" target="_blank" className="text-white/70 hover:text-[#9FEF00] transition-colors">
                            <Github className="size-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="/app">
                            <Button className="h-10 px-4 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80 transition-colors">
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </header>

            <main className="flex-1">
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32" ref={heroRef}>
                    <div className="mx-auto px-8 w-full relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm mb-4"
                            >
                                <Terminal className="mr-2 h-4 w-4" /> Introducing Calliope IDE
                            </motion.div>

                            <TextReveal
                                text="Power Smart Contract Development"
                                className="text-5xl md:text-7xl font-bold tracking-tight"
                                highlightClass="text-white"
                                highlightWords={["Smart", "Contract", "Development"]}
                                staggerDelay={0.015}
                            />

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-xl text-white/70 max-w-2xl mx-auto"
                            >
                                Build, test, and deploy Soroban smart contracts with our powerful development environment. Designed for
                                developers who demand speed and precision.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap gap-4 justify-center mt-8"
                            >
                                <Link href="/app">
                                    <Button className="h-12 px-8 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80 transition-colors">
                                        Start Building
                                    </Button>
                                </Link>

                                <Link href="https://cal.com/atharv777" target="_blank">
                                    <Button
                                        variant="outline"
                                        className="h-12 px-6 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white group"
                                    >
                                        Book a Demo
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="mt-16 md:mt-24 relative max-w-5xl mx-auto"
                        >
                            <HeroImage />
                        </motion.div>
                    </div>
                </section>

                <section className="border-t border-white/10 py-16 relative overflow-hidden">
                    <div className="mx-auto px-8 w-full">
                        <div className="text-center mb-10">
                            <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">
                                Trusted by leading blockchain teams
                            </h2>
                        </div>
                        <LogoCloud />
                    </div>
                </section>

                <section className="py-24 relative" id="features" ref={featuresRef}>
                    <div className="mx-auto px-8 w-full relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold mb-6"
                            >
                                Frontier Smart Contract Development
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-white/70 text-xl"
                            >
                                Our IDE combines powerful development tools with an intuitive interface, making smart contract
                                development accessible to everyone.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 px-10">
                            <FeatureCard
                                title="Intelligent Code Editor"
                                description="Advanced code intelligence with syntax highlighting, auto-completion, and real-time error checking specifically designed for Soroban development."
                                icon={<Code className="size-6" />}
                                index={0}
                            >
                                <CodePreview />
                            </FeatureCard>

                            <FeatureCard
                                title="Integrated Testing Environment"
                                description="Test your smart contracts directly in the IDE with a built-in blockchain simulator that provides instant feedback on contract behavior."
                                icon={<Database className="size-6" />}
                                index={1}
                            >
                                <div className="bg-[#0D1117]/80 border border-white/10 rounded-lg p-4 h-full">
                                    <div className="flex items-center gap-2 mb-3 text-white/70 text-sm">
                                        <div className="size-3 rounded-full bg-[#9FEF00]"></div>
                                        <span>All tests passing</span>
                                    </div>
                                    <div className="space-y-2 font-mono text-xs">
                                        {[
                                            "✓ test_initialize (2.3ms)",
                                            "✓ test_increment (1.8ms)",
                                            "✓ test_transfer (3.1ms)",
                                            "✓ test_authorization (2.5ms)",
                                            "✓ test_error_handling (1.9ms)",
                                        ].map((line, i) => (
                                            <div key={i} className="text-[#9FEF00]">
                                                {line}
                                            </div>
                                        ))}
                                        <div className="mt-4 pt-2 border-t border-white/10 text-white/70">5 tests passed (11.6ms)</div>
                                    </div>
                                </div>
                            </FeatureCard>

                            <FeatureCard
                                title="One-Click Deployment"
                                description="Deploy your contracts to testnet or mainnet with a single click. Our deployment pipeline handles all the complexity for you."
                                icon={<Rocket className="size-6" />}
                                index={2}
                            >
                                <div className="bg-[#0D1117]/80 border border-white/10 rounded-lg p-4 h-full">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">Deployment Target</div>
                                            <div className="bg-[#9FEF00]/10 text-[#9FEF00] text-xs px-2 py-1 rounded">Testnet</div>
                                        </div>
                                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 2, ease: "easeInOut" }}
                                                viewport={{ once: true }}
                                                className="h-full bg-gradient-to-r from-[#9FEF00]/70 to-[#9FEF00]"
                                            ></motion.div>
                                        </div>
                                        <div className="flex justify-between text-xs text-white/50">
                                            <span>Compiling</span>
                                            <span>Optimizing</span>
                                            <span>Deploying</span>
                                            <span>Verifying</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <Link href="/app">
                                                <Button className="w-full bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80">
                                                    Deploy to Mainnet
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FeatureCard>

                            <FeatureCard
                                title="Collaborative Development"
                                description="Work together with your team in real-time. Share your workspace, review code, and collaborate on complex smart contracts."
                                icon={<ExternalLink className="size-6" />}
                                index={3}
                            >
                                <div className="bg-[#0D1117]/80 border border-white/10 rounded-lg p-4 h-full">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-[#9FEF00]/80 flex items-center justify-center text-xs font-medium text-black">
                                                JD
                                            </div>
                                            <div className="size-6 rounded-full bg-[#9FEF00]/60 flex items-center justify-center text-xs font-medium text-black">
                                                KL
                                            </div>
                                            <div className="size-6 rounded-full bg-[#9FEF00]/40 flex items-center justify-center text-xs font-medium text-black">
                                                MN
                                            </div>
                                            <div className="text-xs text-white/70 ml-2">3 collaborators online</div>
                                        </div>
                                        <div className="bg-[#0D1117]/80 border border-white/10 rounded p-3 text-xs font-mono">
                                            <div className="text-[#9FEF00]">// Added by Jane Doe - 2 minutes ago</div>
                                            <div className="text-white mt-1">function transfer(to: Address, amount: u128) {"{"}</div>
                                            <div className="text-white ml-4">
                                                if (amount {">"}this.balance) {"{"}
                                            </div>
                                            <div className="text-white ml-8">throw new Error("Insufficient balance");</div>
                                            <div className="text-white ml-4">{"}"}</div>
                                            <div className="text-white">{"}"}</div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="text-xs text-white/50">Last edit 2m ago</div>
                                            <Link href="/app">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 text-xs border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                                                >
                                                    View Changes
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FeatureCard>
                        </div>
                    </div>
                </section >

                {/* Get Started Section */}
                < section className="py-24 relative overflow-hidden" >
                    <div className="absolute inset-0 bg-[#0D1117] opacity-50"></div>

                    <div className="mx-auto px-8 w-full relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold mb-6"
                            >
                                Start building your Soroban project
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-white/70 text-xl mb-10"
                            >
                                Describe your smart contract idea, and our AI will generate a starter project for you.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -inset-px bg-gradient-to-r from-white/5 to-white/5 rounded-xl opacity-50 blur-sm"></div>
                                <div className="relative rounded-xl border border-white/10 bg-[#0D1117]/90 backdrop-blur-sm shadow-2xl overflow-hidden">
                                    <div className="p-6 relative">
                                        <form action="/api/generate" method="POST">
                                            <textarea
                                                className="min-h-[200px] w-full rounded-md border border-white/10 bg-[#0D1117]/90 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white/20 focus:ring-1 focus:ring-white/10 focus-visible:outline-none transition-all duration-300"
                                                placeholder="Describe your Soroban smart contract idea or project requirements..."
                                                name="prompt"
                                                required
                                            ></textarea>
                                            <div className="mt-4 flex justify-end">
                                                <Link href="/app">
                                                    <Button
                                                        type="submit"
                                                        className="bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80 gap-2 h-10 px-4 rounded-md group"
                                                    >
                                                        Generate Project
                                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section >

                <section className="py-24 relative">
                    <div className="mx-auto px-8 w-full">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold mb-6"
                            >
                                Loved by developers
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-white/70 text-xl max-w-2xl mx-auto"
                            >
                                Join thousands of developers who are building the future of blockchain with Calliope IDE.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    quote:
                                        "Calliope IDE has completely transformed our development workflow. What used to take days now takes hours.",
                                    author: "Alex Johnson",
                                    role: "Lead Developer at BlockTech",
                                },
                                {
                                    quote:
                                        "The integrated testing environment is a game-changer. I can test my contracts in real-time without leaving the IDE.",
                                    author: "Sarah Chen",
                                    role: "Smart Contract Engineer",
                                },
                                {
                                    quote:
                                        "As someone new to blockchain development, Calliope IDE made the learning curve much less steep. Highly recommended.",
                                    author: "Michael Rodriguez",
                                    role: "Full-Stack Developer",
                                },
                            ].map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * i }}
                                    className="bg-[#0D1117]/80 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 hover:bg-[#0D1117]"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className="text-[#9FEF00]">
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-white/80 flex-1 mb-6">"{testimonial.quote}"</p>
                                        <div>
                                            <div className="font-medium">{testimonial.author}</div>
                                            <div className="text-sm text-white/50">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5"></div>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>

                    <div className="mx-auto px-8 w-full relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-6xl font-bold mb-6"
                            >
                                Ready to build the future?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-white/70 text-xl mb-10 max-w-xl mx-auto"
                            >
                                Join thousands of developers building innovative smart contracts with Calliope IDE.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-wrap gap-4 justify-center"
                            >
                                <Link href="/app">
                                    <Button className="h-12 px-8 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80">
                                        Get Started for Free
                                    </Button>
                                </Link>
                                <Link href="https://cal.com/atharv777" target="_blank">
                                    <Button
                                        variant="outline"
                                        className="h-12 px-6 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-white group"
                                    >
                                        Schedule a Demo
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main >

            <footer className="border-t border-white/10 py-16 relative">
                <div className="mx-auto px-8 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="font-medium mb-4">Product</h3>
                            <ul className="space-y-2">
                                {["Features", "Pricing", "Roadmap", "Changelog"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Resources</h3>
                            <ul className="space-y-2">
                                {["Documentation", "Guides", "API Reference", "Examples"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Company</h3>
                            <ul className="space-y-2">
                                {["About", "Blog", "Careers", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Legal</h3>
                            <ul className="space-y-2">
                                {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <img src="logo.svg" alt="Calliope" className="h-[35px]" />
                        </div>

                        <div className="text-sm text-white/50">
                            &copy; {new Date().getFullYear()} Calliope IDE. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    )
}

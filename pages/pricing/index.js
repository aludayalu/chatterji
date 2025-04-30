"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft, GitBranch, GitMerge, GitPullRequest } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PricingPage() {
    const [planType, setPlanType] = useState("individual")

    const appURL = "/app"

    return (
        <div className="flex flex-col min-h-screen bg-[#0D1117] text-white">
            <div className="fixed inset-0 bg-[#0D1117] -z-10"></div>

            {/* Header */}
            <header className="border-b border-white/10 bg-[#0D1117]/80 backdrop-blur-md">
                <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-medium">
                            <ChevronLeft className="size-5" />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/app">
                            <Button className="h-10 px-4 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80 transition-colors">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-16 md:py-24">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Plans that grow with you</h1>

                        {/* Plan Type Toggle */}
                        <div className="flex justify-center mb-16">
                            <div className="inline-flex p-1 rounded-full border border-white/10 bg-white/5">
                                <button
                                    className={cn(
                                        "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                                        planType === "individual"
                                            ? "bg-[#9FEF00] text-black"
                                            : "text-white/70 hover:text-white hover:bg-white/10",
                                    )}
                                    onClick={() => setPlanType("individual")}
                                >
                                    Individual
                                </button>
                                <button
                                    className={cn(
                                        "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                                        planType === "team"
                                            ? "bg-[#9FEF00] text-black"
                                            : "text-white/70 hover:text-white hover:bg-white/10",
                                    )}
                                    onClick={() => setPlanType("team")}
                                >
                                    Team & Enterprise
                                </button>
                            </div>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Free Tier */}
                            <div className="bg-[#0D1117] border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-6 flex flex-col h-full">
                                    <div className="mb-8 flex justify-center">
                                        <div className="size-12 flex items-center justify-center">
                                            <GitBranch className="size-8 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">Free</h3>
                                    <p className="text-white/70 mb-6">Try Calliope IDE</p>

                                    <div className="mb-8">
                                        <span className="text-4xl font-bold">$0</span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full mb-8 border-white/10 text-white hover:bg-white/10 hover:text-white"
                                    >
                                        Stay on Free plan
                                    </Button>

                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-start gap-3">
                                            <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                            <span>Basic IDE features</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                            <span>Build and test smart contracts</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                            <span>Deploy to testnet only</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                            <span>Community support</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pro Tier */}
                            <div className="bg-[#0D1117] border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-6 flex flex-col h-full">
                                    <div className="mb-8 flex justify-center">
                                        <div className="size-12 flex items-center justify-center">
                                            <GitMerge className="size-8 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">Pro</h3>
                                    <p className="text-white/70 mb-6">For everyday development</p>

                                    <div className="mb-8">
                                        <span className="text-4xl font-bold">{planType === "individual" ? "$19" : "$15"}</span>
                                        <span className="text-white/70 ml-2">{planType === "individual" ? "/ month" : "/ month / user"}</span>
                                    </div>
                                    <Link href="https://cal.com/atharv777" target="_blank">
                                        <Button className="w-full mb-8 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80">Get Pro plan</Button>
                                    </Link>
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-3">Everything in Free, plus:</h4>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                                <span>Advanced code intelligence</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                                <span>Access to project templates</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                                <span>Deploy to mainnet</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-white/70 mt-0.5 flex-shrink-0" />
                                                <span>Extended debugging tools</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Max Tier */}
                            <div className="bg-[#0D1117] border border-[#9FEF00]/20 rounded-xl overflow-hidden relative">
                                <div className="absolute inset-px rounded-xl bg-gradient-to-b from-[#9FEF00]/10 to-transparent opacity-50"></div>
                                <div className="p-6 flex flex-col h-full relative">
                                    <div className="mb-8 flex justify-center">
                                        <div className="size-12 flex items-center justify-center">
                                            <GitPullRequest className="size-8 text-[#9FEF00]" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">Max</h3>
                                    <p className="text-white/70 mb-6">5-20x more resources than Pro</p>

                                    <div className="mb-8">
                                        <span className="text-4xl font-bold">From {planType === "individual" ? "$99" : "$75"}</span>
                                        <span className="text-white/70 ml-2">{planType === "individual" ? "/ month" : "/ month / user"}</span>
                                    </div>
                                    <Link href="https://cal.com/atharv777" target="_blank">
                                        <Button className="w-full mb-8 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80">Get Max plan</Button>
                                    </Link>
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-3">Everything in Pro, plus:</h4>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-[#9FEF00] mt-0.5 flex-shrink-0" />
                                                <span>Substantially more compute resources</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-[#9FEF00] mt-0.5 flex-shrink-0" />
                                                <span>Scale based on specific needs</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-[#9FEF00] mt-0.5 flex-shrink-0" />
                                                <span>Higher output limits for all tasks</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-[#9FEF00] mt-0.5 flex-shrink-0" />
                                                <span>Access to advanced AI features</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-[#9FEF00] mt-0.5 flex-shrink-0" />
                                                <span>Early access to new features</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="size-5 text-[#9FEF00] mt-0.5 flex-shrink-0" />
                                                <span>Priority support</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Comparison - Simplified */}
                        <div className="mt-24">
                            <h2 className="text-2xl font-bold mb-8 text-center">Compare features</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="py-4 px-6 text-left font-medium text-white/70">Feature</th>
                                            <th className="py-4 px-6 text-center font-medium text-white/70">Free</th>
                                            <th className="py-4 px-6 text-center font-medium text-white/70">Pro</th>
                                            <th className="py-4 px-6 text-center font-medium text-white/70">Max</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">IDE Access</td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-[#9FEF00] mx-auto" />
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Build & Test</td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-[#9FEF00] mx-auto" />
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Testnet Deployment</td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-[#9FEF00] mx-auto" />
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Mainnet Deployment</td>
                                            <td className="py-4 px-6 text-center">—</td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-white/70 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="size-5 text-[#9FEF00] mx-auto" />
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Project Templates</td>
                                            <td className="py-4 px-6 text-center">Limited</td>
                                            <td className="py-4 px-6 text-center">All</td>
                                            <td className="py-4 px-6 text-center">All + Custom</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">AI Code Assistant</td>
                                            <td className="py-4 px-6 text-center">Basic</td>
                                            <td className="py-4 px-6 text-center">Advanced</td>
                                            <td className="py-4 px-6 text-center">Premium</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Compute Resources</td>
                                            <td className="py-4 px-6 text-center">1x</td>
                                            <td className="py-4 px-6 text-center">3x</td>
                                            <td className="py-4 px-6 text-center">20x</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Collaboration</td>
                                            <td className="py-4 px-6 text-center">—</td>
                                            <td className="py-4 px-6 text-center">Up to 3 users</td>
                                            <td className="py-4 px-6 text-center">Unlimited</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-4 px-6">Support</td>
                                            <td className="py-4 px-6 text-center">Community</td>
                                            <td className="py-4 px-6 text-center">Email</td>
                                            <td className="py-4 px-6 text-center">Priority</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* FAQ Section - Simplified */}
                        <div className="mt-24">
                            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-lg p-6">
                                    <h3 className="font-medium mb-2">Can I switch between plans?</h3>
                                    <p className="text-white/70">
                                        Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be
                                        available immediately. When downgrading, the changes will take effect at the end of your current
                                        billing cycle.
                                    </p>
                                </div>

                                <div className="bg-white/5 rounded-lg p-6">
                                    <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
                                    <p className="text-white/70">
                                        We accept all major credit cards, PayPal, and cryptocurrency payments including Stellar Lumens
                                        (XLM).
                                    </p>
                                </div>

                                <div className="bg-white/5 rounded-lg p-6">
                                    <h3 className="font-medium mb-2">Is there a free trial for paid plans?</h3>
                                    <p className="text-white/70">
                                        Yes, both Pro and Max plans come with a 14-day free trial. No credit card is required to start your
                                        trial.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section - Simplified */}
                        <div className="mt-24 text-center">
                            <h2 className="text-2xl font-bold mb-4">Ready to start building?</h2>
                            <p className="text-white/70 mb-8 max-w-lg mx-auto">
                                Choose the plan that's right for you and begin developing on Calliope today.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href={appURL}>
                                    <Button className="h-12 px-8 bg-[#9FEF00] text-black hover:bg-[#9FEF00]/80">Get Started</Button>
                                </Link>
                                <Link href="https://cal.com/atharv777" target="_blank">
                                    <Button
                                        variant="outline"
                                        className="h-12 px-6 border-white/10 text-white hover:bg-white/10 hover:text-white"
                                    >
                                        Contact Sales
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simplified Footer */}
            <footer className="border-t border-white/10 py-8">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <img src="logo.svg" alt="Calliope" className="h-[35px]" />
                        </div>

                        <div className="text-sm text-white/50">
                            &copy; {new Date().getFullYear()} Calliope IDE. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

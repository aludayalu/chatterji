"use client"

import { motion } from "framer-motion"

export function HeroImage() {
    return (
        <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5"></div>

            <div className="bg-[#0D1117]/90 border-b border-white/10 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <div className="size-3 rounded-full bg-red-500"></div>
                        <div className="size-3 rounded-full bg-yellow-500"></div>
                        <div className="size-3 rounded-full bg-[#9FEF00]"></div>
                    </div>
                    <div className="text-white/50 text-xs ml-2">Calliope IDE - token_contract.rs</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-white/10 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="size-3 border-t border-white/70 rounded-full"
                        ></motion.div>
                    </div>
                    <div className="text-xs text-white/50">Connected to Testnet</div>
                </div>
            </div>

            <div className="flex h-[500px]">
                <div className="w-48 bg-[#0D1117]/80 border-r border-white/10 p-2 hidden md:block">
                    <div className="text-xs font-medium text-white/70 mb-2 px-2">EXPLORER</div>
                    <div className="space-y-1">
                        {[
                            { name: "src", isFolder: true, isOpen: true },
                            { name: "token_contract.rs", isFolder: false, indent: 1 },
                            { name: "lib.rs", isFolder: false, indent: 1 },
                            { name: "tests", isFolder: true, isOpen: false },
                            { name: "target", isFolder: true, isOpen: false },
                            { name: "Cargo.toml", isFolder: false },
                            { name: "README.md", isFolder: false },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center text-xs ${item.isFolder ? "text-white/70" : "text-white/50"
                                    } hover:bg-white/5 hover:text-white rounded px-2 py-1 cursor-pointer transition-colors duration-200`}
                                style={{ paddingLeft: item.indent ? `${item.indent * 1.5}rem` : undefined }}
                            >
                                <div className="mr-2">{item.isFolder ? (item.isOpen ? "📂" : "📁") : "📄"}</div>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-[#0D1117]/90 overflow-hidden">
                    <div className="flex h-full">
                        <div className="flex-1 p-4 font-mono text-sm overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="space-y-0.5"
                            >
                                {[
                                    { line: "pub struct TokenContract {", color: "text-[#9FEF00]/90" },
                                    { line: "    admin: Address,", color: "text-white" },
                                    { line: "    total_supply: u128,", color: "text-white" },
                                    { line: "    balances: Map<Address, u128>,", color: "text-white" },
                                    { line: "}", color: "text-[#9FEF00]/90" },
                                    { line: "", color: "text-white" },
                                    { line: "#[contractimpl]", color: "text-blue-400" },
                                    { line: "impl TokenContract {", color: "text-[#9FEF00]/90" },
                                    {
                                        line: "    pub fn initialize(env: Env, admin: Address, total_supply: u128) -> Self {",
                                        color: "text-[#9FEF00]/90",
                                    },
                                    { line: "        let mut balances = Map::new(&env);", color: "text-white" },
                                    { line: "        balances.set(admin.clone(), total_supply);", color: "text-white" },
                                    { line: "", color: "text-white" },
                                    { line: "        Self {", color: "text-white" },
                                    { line: "            admin,", color: "text-white" },
                                    { line: "            total_supply,", color: "text-white" },
                                    { line: "            balances,", color: "text-white" },
                                    { line: "        }", color: "text-white" },
                                    { line: "    }", color: "text-[#9FEF00]/90" },
                                ].map((item, i) => (
                                    <div key={i} className={`${item.color}`}>
                                        <span className="text-white/30 mr-4 select-none">{i + 1}</span>
                                        {item.line}
                                    </div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                    className="absolute h-5 w-2 bg-white mt-0.5 ml-[270px]"
                                ></motion.div>
                            </motion.div>
                        </div>

                        <div className="w-64 border-l border-white/10 p-3 hidden lg:block">
                            <div className="text-xs font-medium text-white/70 mb-2">PROBLEMS</div>
                            <div className="text-xs text-green-400">No problems detected</div>

                            <div className="text-xs font-medium text-white/70 mt-4 mb-2">OUTLINE</div>
                            <div className="space-y-1 text-xs">
                                <div className="text-white">TokenContract</div>
                                <div className="pl-3 text-white/50">admin: Address</div>
                                <div className="pl-3 text-white/50">total_supply: u128</div>
                                <div className="pl-3 text-white/50">balances: Map</div>
                                <div className="text-white/80">initialize()</div>
                                <div className="text-white/80">transfer()</div>
                                <div className="text-white/80">balance_of()</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0D1117]/95 border-t border-white/10 p-3 h-12 flex items-center">
                <div className="flex items-center gap-3">
                    <div className="text-xs text-white/50">Terminal</div>
                    <div className="text-xs text-green-400">✓ Build successful</div>
                    <div className="text-xs text-green-400">✓ Tests passed</div>
                </div>
            </div>
        </div>
    )
}

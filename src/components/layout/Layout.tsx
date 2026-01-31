import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export function Layout() {

    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            {/* Dynamic Mesh Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[120px]"
                />

                {/* Persistent Top Glow for consistency across pages */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />
            </div>

            <Navbar />

            <main className="flex-1 container mx-auto px-4 sm:px-8 py-8 relative">
                <Outlet />
            </main>
        </div>
    );
}

import { Link, useLocation } from 'react-router-dom';
import { Trophy, FileText, BarChart2, Users } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Trophy },
        { path: '/rank', label: 'My Rankings', icon: FileText },
        { path: '/dashboard', label: 'Global', icon: BarChart2 },
        { path: '/leagues', label: 'My Leagues', icon: Users },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl transition-all duration-300">
            <div className="container flex h-16 items-center px-4 sm:px-8">
                <Link to="/" className="mr-8 flex items-center space-x-2 group">
                    <span className="font-black text-2xl tracking-tighter bg-gradient-to-br from-white via-primary/80 to-primary bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-normal italic uppercase">
                        RankAndFile
                    </span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-2 md:justify-start">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "relative flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                                    isActive
                                        ? "text-white"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className={cn("h-4 w-4 transition-transform duration-300", isActive && "scale-110")} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

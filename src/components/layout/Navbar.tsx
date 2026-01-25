import { Link, useLocation } from 'react-router-dom';
import { Trophy, FileText, BarChart2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Trophy }, // Using Trophy for "League/Home" concept ideally, but Home is landing
        { path: '/rank', label: 'My File', icon: FileText },
        { path: '/dashboard', label: 'Leaderboard', icon: BarChart2 },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container flex h-16 items-center px-4 sm:px-8">
                <Link to="/" className="mr-8 flex items-center space-x-2">
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        RankAndFile.gg
                    </span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-4 md:justify-start">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-white/10",
                                    isActive ? "text-white bg-white/10" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

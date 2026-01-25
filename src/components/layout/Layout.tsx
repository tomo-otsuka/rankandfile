import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
            {/* Background decorations for "Modern/Premium" feel */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
            </div>

            <Navbar />

            <main className="flex-1 container mx-auto px-4 sm:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}

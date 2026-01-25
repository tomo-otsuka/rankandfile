import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                Talk is Cheap. <br /> Show the Receipts.
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                Lock in your rankings. Track your accuracy. <br />
                Find out who actually knows ball.
            </p>

            <div className="flex gap-4">
                <Link
                    to="/rank"
                    className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold h-12 px-8 hover:bg-white/90 transition-colors"
                >
                    Start Ranking
                </Link>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-black/20 backdrop-blur-sm font-semibold h-12 px-8 hover:bg-white/10 transition-colors"
                >
                    View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

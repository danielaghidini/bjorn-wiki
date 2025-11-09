import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
    Home,
    MessageCircle,
    BookOpen,
    ScrollText,
    Menu,
    X,
} from "lucide-react";

export default function Layout() {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex bg-gray-950 min-h-screen text-gray-200">
            {/* Sidebar fixa / retrátil */}
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-gray-900 text-gray-300 flex flex-col justify-between transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                {/* Header */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white">Bjorn Wiki</h1>
                    <p className="text-sm text-gray-400">Skyrim Follower Mod</p>

                    {/* Nav */}
                    <nav className="mt-8 flex flex-col space-y-3">
                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2 hover:text-white ${pathname === "/" ? "text-white font-semibold" : ""
                                }`}
                        >
                            <Home size={18} /> Home
                        </Link>
                        <Link
                            to="/dialogues"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2 hover:text-white ${pathname === "/dialogues" ? "text-white font-semibold" : ""
                                }`}
                        >
                            <MessageCircle size={18} /> Dialogues
                        </Link>
                        <Link
                            to="/quests"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2 hover:text-white ${pathname === "/quests" ? "text-white font-semibold" : ""
                                }`}
                        >
                            <ScrollText size={18} /> Quests
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2 hover:text-white ${pathname === "/about" ? "text-white font-semibold" : ""
                                }`}
                        >
                            <BookOpen size={18} /> About
                        </Link>
                    </nav>
                </div>

                {/* Footer */}
                <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
                    © 2025 Daniela Ghidini
                </div>
            </div>

            {/* Header mobile */}
            <header className="fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between px-4 py-3 md:hidden z-40 shadow-md">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <div className="text-center flex-1">
                    <h1 className="text-lg font-bold">Bjorn Wiki</h1>
                </div>
                <div className="w-8"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 md:ml-60 p-6 mt-16 md:mt-0 overflow-y-auto relative bg-gray-800">
                <Outlet />
            </main>

            {/* Dark Mode mobile */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                ></div>
            )}
        </div>
    );
}

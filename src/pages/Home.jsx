import { useEffect, useState } from "react";
import bjornImage from "../assets/bjorncover2.jpg";

export default function Home() {
    const [modData, setModData] = useState(null);

    useEffect(() => {
        const basePath = import.meta.env.MODE === "production" ? "/bjorn-wiki" : "";
        fetch(`${basePath}/data/modInfo.json`)
            .then((res) => res.json())
            .then((data) => setModData(data))
            .catch((err) => console.error("Error loading mod info:", err));
    }, []);

    if (!modData) return <p className="text-gray-400">Loading mod information...</p>;

    return (
        <div className="space-y-8">
            <header className="text-left py-6">
                <h1 className="text-4xl font-bold text-white mb-2">{modData.title}</h1>
                <p className="text-gray-400 italic">“{modData.subtitle}”</p>
            </header>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-1 text-left">
                    <img
                        src={bjornImage}
                        alt="Bjorn Cover"
                        className="rounded-xl shadow-lg w-full"
                    />

                </div>
                <div className="flex-1 text-left">
                    <h2 className="text-2xl font-semibold text-white mb-2">Mod Information</h2>
                    <ul className="text-gray-400 list-inside space-y-1 list-none">
                        <li><strong>Author:</strong> {modData.modInfo.author}</li>
                        <li><strong>Version:</strong> {modData.modInfo.version}</li>
                        <li><strong>Type:</strong> {modData.modInfo.type}</li>
                        <li><strong>Voice Lines:</strong> {modData.modInfo.voiceLines}</li>
                        <li><strong>Compatibility:</strong> {modData.modInfo.compatibility}</li>
                        <li>
                            <a
                                href={modData.modInfo.nexusLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                View on Nexus Mods
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:max-w-6xl border-t border-gray-700 pt-6">
                <div className="flex-1 text-left">
                    {modData.overview.map((paragraph, i) => (
                        <p key={i} className="text-gray-300 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:max-w-6xl border-t border-gray-700 pt-6">
                <div className="flex-1 text-left">
                    {modData.features.map((feature, i) => (
                        <p key={i} className="text-gray-300 leading-relaxed">
                            {feature}
                        </p>
                    ))}
                </div>
            </div>

            <footer className="border-t border-gray-700 pt-4 text-sm text-gray-500">
                This project is a fan-made expansion to Skyrim, designed for artistic purposes.
            </footer>
        </div>
    );
}

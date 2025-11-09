import { useEffect, useState } from "react";

export default function Dialogues() {
    const [dialogues, setDialogues] = useState([]);

    useEffect(() => {
        const basePath = import.meta.env.MODE === "production" ? "/bjorn-wiki" : "";
        fetch(`${basePath}/data/dialogues.json`)
            .then((res) => res.json())
            .then((data) => setDialogues(data))
            .catch((err) => console.error("Error loading dialogues:", err));
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-2">Bjorn’s Dialogues</h2>
            <p className="text-gray-400 mb-4">
                A collection of Bjorn’s in-game lines, organized by context and mood.
            </p>

            {/* List */}
            {dialogues.length === 0 ? (
                <p className="text-gray-500 italic">Loading dialogues...</p>
            ) : (
                <ul className="space-y-4">
                    {dialogues.map((d) => (
                        <li
                            key={d.id}
                            className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold text-white">{d.context}</h3>
                                <span className="text-sm text-gray-400 capitalize">{d.mood}</span>
                            </div>
                            <p className="text-gray-300 italic mb-2">"{d.text}"</p>
                            <p className="text-xs text-gray-500">Scene: {d.scene}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

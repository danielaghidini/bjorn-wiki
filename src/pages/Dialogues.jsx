import { useEffect, useState } from "react";
import { PlusCircle, Save, Edit3, Trash2 } from "lucide-react";

export default function Dialogues() {
  const [dialogues, setDialogues] = useState([]);
  const [newDialogue, setNewDialogue] = useState({
    id: "",
    topic: "",
    text: "",
    location: "",
    quest: "",
    emotion: "",
    actor: "",
    tags: "",
    notes: ""
  });

  // Detecta se está no ambiente local
  const isLocal = window.location.hostname === "localhost";

  // Carrega JSON inicial
  useEffect(() => {
    const basePath = import.meta.env.MODE === "production" ? "/bjorn-wiki" : "";
    fetch(`${basePath}/data/dialogues.json`)
      .then((res) => res.json())
      .then((data) => setDialogues(data))
      .catch((err) => console.error("Error loading dialogues:", err));
  }, []);

  // Atualiza campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDialogue({ ...newDialogue, [name]: value });
  };

  // Adiciona novo diálogo (apenas em localhost)
  const handleAddDialogue = async () => {
    if (!newDialogue.text.trim()) {
      alert("Please enter dialogue text!");
      return;
    }

    const id =
      newDialogue.id ||
      `bjorn_${String(dialogues.length + 1).padStart(4, "0")}`;
    const formatted = {
      ...newDialogue,
      id,
      tags: newDialogue.tags
        ? newDialogue.tags.split(",").map((t) => t.trim())
        : [],
    };

    const updated = [...dialogues, formatted];
    setDialogues(updated);

    if (isLocal) {
      try {
        const response = await fetch("http://localhost:5174/save-dialogues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated, null, 2),
        });

        if (!response.ok) throw new Error("Failed to save on server");

        alert("✅ Dialogue saved to dialogues.json!");
        console.log("Dialogue written to local file!");
      } catch (err) {
        console.error("❌ Error saving file:", err);
        alert("Failed to save JSON. Make sure 'node server.js' is running.");
      }
    } else {
      localStorage.setItem("dialogues-dev", JSON.stringify(updated));
      console.warn("Simulated save — cannot write on GitHub Pages.");
    }

    setNewDialogue({
      id: "",
      topic: "",
      text: "",
      location: "",
      quest: "",
      emotion: "",
      actor: "",
      tags: "",
      notes: "",
    });
  };

  // 🗑️ Deleta um diálogo (somente local)
  const handleDelete = async (index) => {
    if (!window.confirm("Delete this dialogue?")) return;

    const updated = dialogues.filter((_, i) => i !== index);
    setDialogues(updated);

    if (isLocal) {
      try {
        await fetch("http://localhost:5174/save-dialogues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated, null, 2),
        });
        console.log("🗑️ Dialogue deleted and file updated.");
      } catch (err) {
        console.error("❌ Error deleting:", err);
        alert("Failed to delete. Make sure the local server is running.");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          Bjorn’s Dialogues {isLocal && <Edit3 size={20} className="text-gray-400" />}
        </h2>
        <p className="text-gray-400">
          {isLocal
            ? "Edit mode enabled (localhost only). Changes will update your local JSON."
            : "Read-only mode. Only the mod author can edit dialogues."}
        </p>
      </div>

      {/* Painel de inserção (apenas local) */}
      {isLocal && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <PlusCircle size={20} /> Add New Dialogue
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="topic"
              placeholder="Topic"
              value={newDialogue.topic}
              onChange={handleChange}
              className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700"
            />
            <input
              name="location"
              placeholder="Location"
              value={newDialogue.location}
              onChange={handleChange}
              className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700"
            />
            <input
              name="quest"
              placeholder="Quest"
              value={newDialogue.quest}
              onChange={handleChange}
              className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700"
            />
            <input
              name="emotion"
              placeholder="Emotion"
              value={newDialogue.emotion}
              onChange={handleChange}
              className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700"
            />
            <input
              name="actor"
              placeholder="Actor"
              value={newDialogue.actor}
              onChange={handleChange}
              className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700"
            />
            <input
              name="tags"
              placeholder="Tags (comma separated)"
              value={newDialogue.tags}
              onChange={handleChange}
              className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700"
            />
          </div>

          <textarea
            name="text"
            placeholder="Dialogue text..."
            value={newDialogue.text}
            onChange={handleChange}
            className="w-full bg-gray-800 text-gray-200 p-2 rounded border border-gray-700 h-24"
          />

          <input
            name="notes"
            placeholder="Notes"
            value={newDialogue.notes}
            onChange={handleChange}
            className="bg-gray-800 text-gray-200 p-2 rounded border border-gray-700 w-full"
          />

          <button
            onClick={handleAddDialogue}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            <Save size={18} /> Save Dialogue
          </button>
        </div>
      )}

      {/* Lista de diálogos */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">All Dialogues</h3>
        {dialogues.length === 0 ? (
          <p className="text-gray-400">No dialogues found.</p>
        ) : (
          <ul className="space-y-4">
            {dialogues.map((d, index) => (
              <li
                key={d.id || index}
                className="border border-gray-700 rounded-lg p-4 bg-gray-800 hover:bg-gray-750 transition relative"
              >
                {isLocal && (
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                    title="Delete dialogue"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-white">
                    {d.text || "Untitled"}
                  </h4>
                </div>
                <p className="text-gray-200 mb-2">
                  Topic: {d.topic} - Actor: {d.actor}
                </p>
                <p className="text-xs text-gray-300">
                  <strong>Location:</strong> {d.location || "Any"} |{" "}
                  <strong>Quest:</strong> {d.quest || "None"} |{" "}
                  <strong>Emotion:</strong> {d.emotion || "Neutral"}
                </p>
                {d.tags?.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    <strong>Tags:</strong> {d.tags.join(", ")}
                  </p>
                )}
                {d.notes && (
                  <p className="text-xs text-gray-500 mt-1">{d.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

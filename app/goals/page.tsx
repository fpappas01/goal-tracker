"use client";
import Form from "@/components/forms/form";
import CountdownTimer from "@/components/others/countdown";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { format } from "node:path/win32";
import { useState, useEffect } from "react";

type Item = {
  id: string;
  description: string;
  targetDate: Date;
};

export default function GoalsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState<{
    id: string;
    description: string;
    timeLeft: string;
  }>();

  // 1. Φόρτωση δεδομένων από το API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("/api/goals");
        const data = await res.json();
        console.log("data", data);
        const formatted = data.map((d: Item) => ({
          id: d.id,
          description: d.description,
          targetDate: new Date(d.targetDate),
        }));
        console.log("formatteddata", formatted);
        setItems(formatted);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  // 2. Διαγραφή μέσω API
  async function handleDelete(id: string) {
    const res = await fetch(`/api/goals/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((curItems) => curItems.filter((item) => item.id !== id));
    }
  }

  // 3. Δημιουργία μέσω API
  async function onSubmit(description: string, dateStr: string) {
    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({ description, targetDate: dateStr }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newItem = await res.json();
      setItems((prev) => [
        { ...newItem, targetDate: new Date(newItem.target_date) },
        ...prev,
      ]);
      setIsOpen(false);
    }
  }

  // 4. Update μέσω API (Προαιρετικά αν έχεις φτιάξει το PATCH route)
  async function onUpdate(id: string, description: string, dateStr: string) {
    try {
      const res = await fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, targetDate: dateStr }),
      });

      if (res.ok) {
        const updatedItem = await res.json();

        // Ενημερώνουμε το state των items
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  description: updatedItem.description,
                  targetDate: new Date(updatedItem.target_date),
                }
              : item,
          ),
        );

        setInitialData(undefined);
        setIsOpen(false);
      } else {
        setError("Something went wrong, try again.");
      }
    } catch (error) {
      console.error("Update fetch error:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
          {error}
        </div>
      )}
      {isOpen && (
        <Form
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={() => setIsOpen(false)}
          onUpdate={onUpdate}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">My Goals</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            <Plus size={20} />
            <span className="font-semibold">Add Goal</span>
          </button>
        </div>

        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center p-6 rounded-2xl bg-[#161616] border border-gray-800 hover:border-gray-700 transition"
            >
              {/* Αριστερά: Περιγραφή */}
              <div className="mb-4 md:mb-0">
                <p className="text-xl font-semibold text-gray-100">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500">
                  Target: {item.targetDate.toLocaleDateString()}
                </p>
              </div>

              {/* Κέντρο: Το Κυκλικό Ρολόι */}
              <div className="flex justify-center">
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-2 border-blue-500/30 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <div className="text-center scale-90">
                    <CountdownTimer targetDate={item.targetDate} />
                  </div>
                  {/* Διακοσμητικά στοιχεία "ρολογιού" */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-blue-500/40 rounded-full"></div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-blue-500/40 rounded-full"></div>
                </div>
              </div>

              {/* Δεξιά: Buttons */}
              <div className="flex justify-end gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => {
                    setInitialData({
                      id: item.id,
                      description: item.description,
                      timeLeft: item.targetDate.toISOString().slice(0, 16),
                    });
                    setIsOpen(true);
                  }}
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-blue-500/20 hover:text-blue-400 transition"
                >
                  <Pencil size={20} />
                </button>
                <button
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-red-500/20 hover:text-red-400 transition"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {items.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl">
            <p className="text-gray-500">
              No goals found. Start by adding one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

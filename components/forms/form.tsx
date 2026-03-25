"use client";

type FormProps = {
  initialData?: { id: string; description: string; timeLeft: string };
  onSubmit: (description: string, date: string) => void;
  onClose: () => void;
  onUpdate: (id: string, description: string, date: string) => void;
};

export default function Form({
  initialData,
  onClose,
  onSubmit,
  onUpdate,
}: FormProps) {
  const now = new Date().toISOString().slice(0, 16);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;

    if (!description || !date) return;

    if (initialData?.id) {
      onUpdate(initialData.id, description, date);
    } else {
      onSubmit(description, date);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] text-white w-full max-w-md p-6 rounded-xl border border-gray-800 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            {initialData ? "Edit Goal" : "Add New Goal"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Description
            </label>
            <input
              name="description"
              type="text"
              required
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. Finish Project"
              defaultValue={initialData?.description}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Target Date & Time
            </label>
            <input
              name="date"
              min={now}
              type="datetime-local"
              required
              className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              defaultValue={initialData?.timeLeft}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium transition shadow-lg shadow-blue-900/20"
            >
              {initialData ? "Save Changes" : "Start Countdown"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

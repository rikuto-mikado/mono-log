import { useEffect, useState } from "react";
import {
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    fetch("http://localhost:8005/api/notepapers/")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data)
        if (data.length > 0) {
          setSelectedNote(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddNote = () => {
    fetch("http://localhost:8005/api/notepapers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Note", content: "", category: "general" }),
    })
      .then((res) => res.json())
      .then((newNote) => {
        setNotes((prev) => [...prev, newNote]);
        setSelectedNote(newNote);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateNote = (updated: Note) => {
    fetch(`http://localhost:8005/api/notepapers/${updated.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updated.title, content: updated.content }),
    })
      .then((res) => res.json())
      .then((saved) => {
        setNotes((prev) => prev.map((n) => (n.id === saved.id ? saved : n)));
        setSelectedNote(saved);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteNote = (id: number) => {
    fetch(`http://localhost:8005/api/notepapers/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        if (selectedNote?.id === id) {
          setSelectedNote(null);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <SidebarProvider>
      <AppSidebar
        notes={notes}
        onSelectNote={setSelectedNote}
        selectedNoteId={selectedNote?.id} 
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />

      <SidebarInset>
        <header className="flex h-12 items-center border-b px-4 bg-white shrink-0">
          <SidebarTrigger />
          <h1 className="ml-4 font-semibold text-slate-400">
            My Workspace / <span className="text-slate-900 font-medium">{selectedNote?.title}</span>
          </h1>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto grid gap-6">
            {selectedNote ? (
              <article>
                <div className="mb-8">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase">
                    {selectedNote.category}
                  </span>
                  <input
                    className="block w-full text-4xl font-bold mt-4 text-slate-900 leading-tight bg-transparent outline-none border-b border-transparent focus:border-slate-300"
                    value={selectedNote.title}
                    onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                    onBlur={() => handleUpdateNote(selectedNote)}
                  />
                </div>
                <textarea
                  className="w-full text-lg text-slate-700 leading-relaxed bg-transparent outline-none resize-none min-h-[60vh]"
                  value={selectedNote.content}
                  onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                  onBlur={() => handleUpdateNote(selectedNote)}
                />
              </article>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Please select a note from the left sidebar.
                </div>
              )}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;

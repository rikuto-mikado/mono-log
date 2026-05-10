import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        if (data.length > 0 && !selectedNote) {
          setSelectedNote(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full font-sans">
        <AppSidebar notes={notes} onSelectNote={setSelectedNote} selectedNoteId={selectedNote?.id} />
        
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          <header className="flex h-12 items-center border-b px-4 bg-white shrink-0">
            <SidebarTrigger />
            <h1 className="ml-4 font-semibold text-slate-400">My Workspace / <span className="text-slate-900 font-medium">{selectedNote?.title}</span></h1>
          </header>
          
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-3xl mx-auto grid gap-6">
              
              {selectedNote ? (
                <article>
                  <div className="mb-8">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase">
                      {selectedNote.category}
                    </span>
                    <h1 className="text-4xl font-bold mt-4 text-slate-900 leading-tight">
                      {selectedNote.title || "Untitled"}
                    </h1>
                  </div>
                  <div className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedNote.content || "No content"}
                  </div>
                </article>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Please select a note from the left sidebar.
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;

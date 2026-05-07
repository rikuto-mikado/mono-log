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

  useEffect(() => {
    fetch("http://localhost:8005/api/notepapers/")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar notes={notes} />
        
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          <header className="flex h-12 items-center border-b px-4 bg-white">
            <SidebarTrigger />
            <h1 className="ml-4 font-semibold text-slate-700">My Workspace</h1>
          </header>
          
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-3xl mx-auto grid gap-6">
              {notes.map((note) => (
                <div key={note.id} className="p-4 border rounded shadow">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mt-2 inline-block">
                    {note.category}
                  </span>
                  <h2 className="text-2xl font-bold mt-1 text-slate-800">{note.title}</h2>
                  <p className="text-slate-600 mt-2 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;

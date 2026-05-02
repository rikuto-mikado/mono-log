import { useEffect, useState } from "react";

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <div className="grid gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mt-2 inline-block">
              {note.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

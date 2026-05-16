# Inline Editing

Notes are editable directly in the main content area. No separate edit mode or save button is needed.

## How It Works

1. The user selects a note from the sidebar — it loads into the main area.
2. The title and content are rendered as native `<input>` and `<textarea>` elements.
3. Changes are reflected in local state immediately via `onChange`.
4. When the user moves focus away (`onBlur`), a `PATCH` request is sent to the backend to persist the change.
5. The saved response from the API updates both the notes list and the selected note in state.

## Backend

`ModelViewSet` in Django REST Framework automatically exposes `PATCH /api/notepapers/{id}/`. No backend changes were required.

## Frontend Changes

### `App.tsx`

**Add `handleUpdateNote`** after `handleAddNote`:

```tsx
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
```

**Replace the `<article>` block** with editable fields:

```tsx
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
```

## Save Trigger

Saves on `onBlur` (when the user clicks away or tabs out). This avoids sending a `PATCH` request on every keystroke while still persisting changes without a manual save button.

# Frontend Patterns

## State Management (App.tsx)

```ts
const [notes, setNotes] = useState<Note[]>([]);
const [selectedNote, setSelectedNote] = useState<Note | null>(null);
```

- `notes` : list of notes fetched from the API
- `selectedNote` : currently selected note (null = none selected)

---

## API Fetch (useEffect)

```ts
useEffect(() => {
  fetch("http://localhost:8005/api/notepapers/")
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
      if (data.length > 0 && !selectedNote) {
        setSelectedNote(data[0]); // default to first note on load
      }
    });
}, []); // [] = runs once on mount
```

---

## Passing Props to Sidebar

```tsx
<AppSidebar
  notes={notes}
  onSelectNote={setSelectedNote}    // updates selectedNote on click
  selectedNoteId={selectedNote?.id} // ?. = returns undefined if null (no crash)
/>
```

---

## Rendering Note List (app-sidebar.tsx)

```tsx
{notes.map((note) => (
  <SidebarMenuItem key={note.id}>
    <SidebarMenuButton
      isActive={selectedNoteId === note.id}  // highlight if selected
      onClick={() => onSelectNote(note)}      // update parent state on click
    >
      ...
    </SidebarMenuButton>
  </SidebarMenuItem>
))}
```

- `notes.map()` : transforms an array into JSX elements
- `key={note.id}` : required for React to efficiently update lists

---

## Conditional Rendering (selectedNote ?)

```tsx
{selectedNote ? (
  <article>...</article>            // note is selected
) : (
  <div>Please select a note...</div> // nothing selected
)}
```

- `selectedNote` is `null` → falsy → shows the `:` branch

---

## Data Flow Summary

```
API → setNotes → notes[]
                    ↓
              AppSidebar (renders list)
                    ↓ click
              onSelectNote = setSelectedNote
                    ↓
              selectedNote → displayed in main area
```

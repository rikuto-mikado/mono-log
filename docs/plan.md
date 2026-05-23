# Plan: Trash Feature

## Backend (Django)

- **Model Update**: Add `is_deleted` (Boolean) and `deleted_at` (DateTime) to `NotePaper`.
- **Logic**: Implement soft-delete (update `is_deleted=True` instead of DB removal).
- **API Endpoints**:
  - `GET /api/notepapers/`: Fetch active notes only.
  - `GET /api/notepapers/trash/`: Fetch deleted notes.
  - `POST /api/notepapers/{id}/restore/`: Restore a note.
  - `DELETE /api/notepapers/{id}/permanent/`: Hard delete from DB.

## Frontend (React)

- **Sidebar**: Add a "Trash" navigation item at the bottom of `AppSidebar`.
- **View**: Create a dedicated view or filter to display trashed notes.
- **Actions**: Add "Restore" and "Delete Permanently" buttons for notes in Trash.
- **Sync**: Ensure the notes list and trash list update correctly after actions.

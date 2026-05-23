import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { FileText, Plus, User2, Trash2 } from "lucide-react"

interface Note {
    id: number;
    title: string;
    content: string;
    category: string;
}

interface AppSidebarProps {
    notes: Note[];
    onSelectNote: (note: Note) => void;
    selectedNoteId?: number;
    onAddNote: () => void;
    onDeleteNote: (id: number) => void;
}

export function AppSidebar({ notes, onSelectNote, selectedNoteId, onAddNote, onDeleteNote }: AppSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader>
                <span className="font-bold text-lg px-2">mono-log</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Note</SidebarGroupLabel>
                    <SidebarGroupAction title="Add Note" onClick={onAddNote}>
                        <Plus className="w-4 h-4" />
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {notes.map((note) => (
                                <SidebarMenuItem key={note.id}>
                                    <SidebarMenuButton 
                                      asChild 
                                      isActive={selectedNoteId === note.id} 
                                    >
                                        <div 
                                          className="flex items-center justify-between w-full group/item cursor-pointer shrink-0"
                                          onClick={() => onSelectNote(note)}
                                        >
                                          <div className="flex items-center gap-2 overflow-hidden">
                                            <FileText className="w-4 h-4 shrink-0" />
                                            <span className="truncate font-medium">{note.title || "Untitled"}</span>
                                          </div>
                                          <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteNote(note.id);
                                            }}
                                            className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-red-600 transition-all shrink-0"
                                            title="Delete note"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <User2 />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
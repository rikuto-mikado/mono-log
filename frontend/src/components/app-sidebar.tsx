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
import { FileText, Plus, User2 } from "lucide-react"

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
}

export function AppSidebar({ notes, onSelectNote, selectedNoteId, onAddNote }: AppSidebarProps) {
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
                                      onClick={() => onSelectNote(note)}
                                    >
                                        <button className="flex items-center gap-2 w-full text-left">
                                            <FileText />
                                            <span className="truncate font-medium">{note.title || "Untitled"}</span>
                                        </button>
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
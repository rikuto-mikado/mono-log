import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FileText, Plus } from "lucide-react"

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
}

export function AppSidebar({ notes, onSelectNote, selectedNoteId }: AppSidebarProps) {
    return (
        <Sidebar>
            <SidebarContent className="bg-slate-50">
                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-4 mt-2">
                        <SidebarGroupLabel className="text-lg font-bold text-slate-900">
                            Private
                        </SidebarGroupLabel>
                        <button className="p-1 hover:bg-slate-200 rounded text-slate-500">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
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
                                            <FileText/>
                                            <span></span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
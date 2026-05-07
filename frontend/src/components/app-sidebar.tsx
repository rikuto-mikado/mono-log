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
}

export function AppSidebar({ notes }: { notes: Note[] }) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center justify-between px-2 mb-4 mt-2">
                        <SidebarGroupLabel className="text-lg font-bold text-slate-900">
                            NotePaper
                        </SidebarGroupLabel>
                        <button className="p-1 hover:bg-slate-200 rounded">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {notes.map((note) => (
                                <SidebarMenuItem key={note.id}>
                                    <SidebarMenuButton asChild>
                                        <a href={`#${note.id}`} className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-slate-500" />
                                            <span className="truncate">{note.title || "Untitled"}</span>
                                        </a>
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
import { useState } from "react";
import { Search, Grid, List, Users } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Tabs } from "@/shared/ui/Tabs";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useMembers, useFilteredMembers } from "./hooks";
import { MemberGridCard, MemberListCard } from "./components";

type FilterType = "all" | "online" | "vip" | "nearby";
type ViewMode = "grid" | "list";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "online", label: "Online" },
  { id: "vip", label: "VIP" },
  { id: "nearby", label: "Nearby" },
];

export default function MembersPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");

  const { members, isLoading } = useMembers(filter);
  const filteredMembers = useFilteredMembers(members, search);

  return (
    <div className="py-6">
      <PageHeader
        title="Members"
        subtitle="Connect with our community"
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
            data-testid="input-search-members"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            data-testid="button-grid-view"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            data-testid="button-list-view"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs
        tabs={filterTabs}
        activeTab={filter}
        onChange={(id) => setFilter(id as FilterType)}
        className="mb-6"
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredMembers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No members found"
          description="Try adjusting your search or filters"
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMembers.map((member, index) => (
            <MemberGridCard key={member.id} member={member} index={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMembers.map((member, index) => (
            <MemberListCard key={member.id} member={member} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, LogOut, Search, Pencil, Trash2, Home, Users, Building2 } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: string;
  cidade: string | null;
  estado: string | null;
  tipo: string | null;
  image: string;
  created_at: string;
}

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  mensagem: string | null;
  imovel_id: string | null;
  created_at: string;
}

const Admin = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"imoveis" | "cadastros">("imoveis");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchProperties();
    fetchLeads();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      navigate("/admin/login");
    }
  };

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("id, title, price, cidade, estado, tipo, image, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setLeads(data || []);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este imóvel?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Imóvel excluído com sucesso" });
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Excluir este cadastro?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.cidade && p.cidade.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredLeads = leads.filter((l) =>
    l.nome.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    (l.telefone && l.telefone.includes(search))
  );

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <Home className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-heading font-bold text-foreground">Painel Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            {tab === "imoveis" && (
              <Button onClick={() => navigate("/admin/novo")} className="bg-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-1" /> Novo Imóvel
              </Button>
            )}
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={tab === "imoveis" ? "default" : "outline"}
            onClick={() => { setTab("imoveis"); setSearch(""); }}
            className="gap-2"
          >
            <Building2 className="w-4 h-4" /> Imóveis ({properties.length})
          </Button>
          <Button
            variant={tab === "cadastros" ? "default" : "outline"}
            onClick={() => { setTab("cadastros"); setSearch(""); }}
            className="gap-2"
          >
            <Users className="w-4 h-4" /> Cadastros ({leads.length})
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={tab === "imoveis" ? "Buscar por título ou cidade..." : "Buscar por nome, email ou telefone..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {tab === "imoveis" ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Total de Imóveis</p>
                <p className="text-2xl font-heading font-bold text-foreground">{properties.length}</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Cidades</p>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {new Set(properties.map((p) => p.cidade).filter(Boolean)).size}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Resultados</p>
                <p className="text-2xl font-heading font-bold text-foreground">{filteredProperties.length}</p>
              </div>
            </div>

            {/* Properties Table */}
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Carregando...</div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum imóvel encontrado</p>
                <Button onClick={() => navigate("/admin/novo")} className="bg-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Imóvel
                </Button>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary">
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">Imóvel</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3 hidden sm:table-cell">Cidade</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3 hidden md:table-cell">Tipo</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">Preço</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map((property) => (
                        <tr key={property.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img src={property.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate max-w-[200px] lg:max-w-[400px]">{property.title}</p>
                                <p className="text-xs text-muted-foreground sm:hidden">{property.cidade}/{property.estado}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-sm text-foreground hidden sm:table-cell">{property.cidade}/{property.estado}</td>
                          <td className="p-3 text-sm text-foreground hidden md:table-cell">{property.tipo}</td>
                          <td className="p-3 text-sm font-medium text-coral">{property.price}</td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/editar/${property.id}`)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(property.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Leads Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Total de Cadastros</p>
                <p className="text-2xl font-heading font-bold text-foreground">{leads.length}</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Hoje</p>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {leads.filter((l) => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">Resultados</p>
                <p className="text-2xl font-heading font-bold text-foreground">{filteredLeads.length}</p>
              </div>
            </div>

            {/* Leads Table */}
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">Nenhum cadastro encontrado</div>
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary">
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">Nome</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">Email</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3 hidden sm:table-cell">Telefone</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3 hidden md:table-cell">Mensagem</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3 hidden lg:table-cell">Data</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                          <td className="p-3 text-sm font-medium text-foreground">{lead.nome}</td>
                          <td className="p-3 text-sm text-foreground">{lead.email}</td>
                          <td className="p-3 text-sm text-foreground hidden sm:table-cell">{lead.telefone || "-"}</td>
                          <td className="p-3 text-sm text-muted-foreground hidden md:table-cell truncate max-w-[200px]">{lead.mensagem || "-"}</td>
                          <td className="p-3 text-sm text-muted-foreground hidden lg:table-cell">
                            {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="p-3">
                            <div className="flex justify-end">
                              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDeleteLead(lead.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;

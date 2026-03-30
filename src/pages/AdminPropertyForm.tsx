import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, Save } from "lucide-react";

const AdminPropertyForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    title: "",
    address: "",
    price: "",
    old_price: "",
    discount: "",
    tags: [] as string[],
    closing_date: "",
    date1: "",
    price1: "",
    date2: "",
    price2: "",
    area_total: "",
    area_util: "",
    area_terreno: "",
    quartos: "",
    vagas: "",
    descricao: "",
    banco: "",
    tipo: "",
    estado: "",
    cidade: "",
    bairro: "",
    comarca: "",
    oficio: "",
    matricula: "",
    codigo_origem: "",
    data_inclusao: "",
    valor_avaliacao: "",
    aceita_financiamento: true,
    aceita_fgts: true,
    aceita_parcelamento: true,
    condominio: "",
    tributos: "",
    image: "",
    images: [] as string[],
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    checkAuth();
    if (isEditing && id) loadProperty(id);
  }, [id]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) navigate("/admin/login");
  };

  const loadProperty = async (propId: string) => {
    const { data, error } = await supabase.from("properties").select("*").eq("id", propId).single();
    if (error || !data) {
      toast({ title: "Imóvel não encontrado", variant: "destructive" });
      navigate("/admin");
      return;
    }
    setForm({
      id: data.id,
      title: data.title,
      address: data.address,
      price: data.price,
      old_price: data.old_price || "",
      discount: data.discount || "",
      tags: data.tags || [],
      closing_date: data.closing_date || "",
      date1: data.date1 || "",
      price1: data.price1 || "",
      date2: data.date2 || "",
      price2: data.price2 || "",
      area_total: data.area_total || "",
      area_util: data.area_util || "",
      area_terreno: data.area_terreno || "",
      quartos: data.quartos?.toString() || "",
      vagas: data.vagas?.toString() || "",
      descricao: data.descricao || "",
      banco: data.banco || "",
      tipo: data.tipo || "",
      estado: data.estado || "",
      cidade: data.cidade || "",
      bairro: data.bairro || "",
      comarca: data.comarca || "",
      oficio: data.oficio || "",
      matricula: data.matricula || "",
      codigo_origem: data.codigo_origem || "",
      data_inclusao: data.data_inclusao || "",
      valor_avaliacao: data.valor_avaliacao || "",
      aceita_financiamento: data.aceita_financiamento,
      aceita_fgts: data.aceita_fgts,
      aceita_parcelamento: data.aceita_parcelamento,
      condominio: data.condominio || "",
      tributos: data.tributos || "",
      image: data.image,
      images: data.images || [],
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("property-images").upload(path, file);
      if (error) {
        toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
        continue;
      }
      const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(path);
      newImages.push(urlData.publicUrl);
    }

    setForm((prev) => {
      const updated = { ...prev, images: [...prev.images, ...newImages] };
      if (!updated.image && newImages.length > 0) updated.image = newImages[0];
      return updated;
    });
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setForm((prev) => {
      const imgs = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: imgs, image: imgs[0] || prev.image };
    });
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      toast({ title: "Preencha título e preço", variant: "destructive" });
      return;
    }
    setLoading(true);

    const payload = {
      id: form.id || Date.now().toString(),
      title: form.title,
      address: form.address,
      price: form.price,
      old_price: form.old_price || null,
      discount: form.discount || null,
      tags: form.tags,
      closing_date: form.closing_date || null,
      date1: form.date1 || null,
      price1: form.price1 || null,
      date2: form.date2 || null,
      price2: form.price2 || null,
      area_total: form.area_total || null,
      area_util: form.area_util || null,
      area_terreno: form.area_terreno || null,
      quartos: form.quartos ? parseInt(form.quartos) : null,
      vagas: form.vagas ? parseInt(form.vagas) : null,
      descricao: form.descricao || null,
      banco: form.banco || null,
      tipo: form.tipo || null,
      estado: form.estado || null,
      cidade: form.cidade || null,
      bairro: form.bairro || null,
      comarca: form.comarca || null,
      oficio: form.oficio || null,
      matricula: form.matricula || null,
      codigo_origem: form.codigo_origem || null,
      data_inclusao: form.data_inclusao || null,
      valor_avaliacao: form.valor_avaliacao || null,
      aceita_financiamento: form.aceita_financiamento,
      aceita_fgts: form.aceita_fgts,
      aceita_parcelamento: form.aceita_parcelamento,
      condominio: form.condominio || null,
      tributos: form.tributos || null,
      image: form.image || form.images[0] || "",
      images: form.images,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("properties").update(payload).eq("id", id!));
    } else {
      ({ error } = await supabase.from("properties").insert(payload));
    }

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEditing ? "Imóvel atualizado!" : "Imóvel criado!" });
      navigate("/admin");
    }
    setLoading(false);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center gap-3 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-heading font-bold text-foreground">
            {isEditing ? "Editar Imóvel" : "Novo Imóvel"}
          </h1>
        </div>
      </header>

      <main className="container py-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Título *</Label>
                <Input value={form.title} onChange={set("title")} placeholder="Casa em Belém / PA" className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label>Endereço</Label>
                <Input value={form.address} onChange={set("address")} placeholder="Rua..." className="mt-1" />
              </div>
              <div>
                <Label>ID</Label>
                <Input value={form.id} onChange={set("id")} placeholder="Auto-gerado se vazio" className="mt-1" disabled={isEditing} />
              </div>
              <div>
                <Label>Tipo</Label>
                <Input value={form.tipo} onChange={set("tipo")} placeholder="Casa, Apartamento..." className="mt-1" />
              </div>
              <div>
                <Label>Banco</Label>
                <Input value={form.banco} onChange={set("banco")} placeholder="Caixa" className="mt-1" />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea value={form.descricao} onChange={set("descricao")} placeholder="Descrição do imóvel..." className="mt-1" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Localização</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Estado</Label>
                <Input value={form.estado} onChange={set("estado")} placeholder="PA" className="mt-1" />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input value={form.cidade} onChange={set("cidade")} placeholder="Belém" className="mt-1" />
              </div>
              <div>
                <Label>Bairro</Label>
                <Input value={form.bairro} onChange={set("bairro")} placeholder="Centro" className="mt-1" />
              </div>
              <div>
                <Label>Comarca</Label>
                <Input value={form.comarca} onChange={set("comarca")} className="mt-1" />
              </div>
              <div>
                <Label>Ofício</Label>
                <Input value={form.oficio} onChange={set("oficio")} className="mt-1" />
              </div>
              <div>
                <Label>Matrícula</Label>
                <Input value={form.matricula} onChange={set("matricula")} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Preços e Datas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Preço *</Label>
                <Input value={form.price} onChange={set("price")} placeholder="R$ 100.000,00" className="mt-1" />
              </div>
              <div>
                <Label>Preço Antigo</Label>
                <Input value={form.old_price} onChange={set("old_price")} placeholder="R$ 150.000,00" className="mt-1" />
              </div>
              <div>
                <Label>Desconto</Label>
                <Input value={form.discount} onChange={set("discount")} placeholder="40%" className="mt-1" />
              </div>
              <div>
                <Label>Data Encerramento</Label>
                <Input value={form.closing_date} onChange={set("closing_date")} placeholder="30/03/2026 18:00" className="mt-1" />
              </div>
              <div>
                <Label>1ª Praça - Data</Label>
                <Input value={form.date1} onChange={set("date1")} placeholder="30/03/2026 18:00" className="mt-1" />
              </div>
              <div>
                <Label>1ª Praça - Preço</Label>
                <Input value={form.price1} onChange={set("price1")} placeholder="R$ 97.581,50" className="mt-1" />
              </div>
              <div>
                <Label>2ª Praça - Data</Label>
                <Input value={form.date2} onChange={set("date2")} className="mt-1" />
              </div>
              <div>
                <Label>2ª Praça - Preço</Label>
                <Input value={form.price2} onChange={set("price2")} className="mt-1" />
              </div>
              <div>
                <Label>Valor Avaliação</Label>
                <Input value={form.valor_avaliacao} onChange={set("valor_avaliacao")} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Detalhes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Área Total</Label>
                <Input value={form.area_total} onChange={set("area_total")} placeholder="69,16 m²" className="mt-1" />
              </div>
              <div>
                <Label>Área Útil</Label>
                <Input value={form.area_util} onChange={set("area_util")} className="mt-1" />
              </div>
              <div>
                <Label>Área Terreno</Label>
                <Input value={form.area_terreno} onChange={set("area_terreno")} className="mt-1" />
              </div>
              <div>
                <Label>Quartos</Label>
                <Input type="number" value={form.quartos} onChange={set("quartos")} className="mt-1" />
              </div>
              <div>
                <Label>Vagas</Label>
                <Input type="number" value={form.vagas} onChange={set("vagas")} className="mt-1" />
              </div>
              <div>
                <Label>Código Origem</Label>
                <Input value={form.codigo_origem} onChange={set("codigo_origem")} className="mt-1" />
              </div>
              <div>
                <Label>Data Inclusão</Label>
                <Input value={form.data_inclusao} onChange={set("data_inclusao")} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Pagamento</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Aceita Financiamento</Label>
                <Switch checked={form.aceita_financiamento} onCheckedChange={(v) => setForm((p) => ({ ...p, aceita_financiamento: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Aceita FGTS</Label>
                <Switch checked={form.aceita_fgts} onCheckedChange={(v) => setForm((p) => ({ ...p, aceita_fgts: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Aceita Parcelamento</Label>
                <Switch checked={form.aceita_parcelamento} onCheckedChange={(v) => setForm((p) => ({ ...p, aceita_parcelamento: v }))} />
              </div>
              <div>
                <Label>Condomínio</Label>
                <Textarea value={form.condominio} onChange={set("condominio")} className="mt-1" />
              </div>
              <div>
                <Label>Tributos</Label>
                <Textarea value={form.tributos} onChange={set("tributos")} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Tags</h2>
            <div className="flex gap-2 mb-3">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="FGTS, Venda Online..."
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>Adicionar</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span key={tag} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-bold text-lg text-foreground mb-4">Imagens</h2>
            <div className="mb-4">
              <Label>URL da Imagem Principal</Label>
              <Input value={form.image} onChange={set("image")} placeholder="https://..." className="mt-1" />
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer bg-secondary rounded-lg border-2 border-dashed border-border p-6 justify-center hover:border-primary transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploading ? "Enviando..." : "Clique para fazer upload de imagens"}
                </span>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt="" className="w-full h-20 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/admin")}>Cancelar</Button>
            <Button type="submit" className="bg-primary text-primary-foreground" disabled={loading}>
              <Save className="w-4 h-4 mr-1" />
              {loading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Imóvel"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminPropertyForm;

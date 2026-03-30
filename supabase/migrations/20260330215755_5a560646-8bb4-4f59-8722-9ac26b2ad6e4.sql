-- Create properties table
CREATE TABLE public.properties (
  id TEXT NOT NULL PRIMARY KEY,
  image TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  title TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL,
  old_price TEXT,
  discount TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  closing_date TEXT,
  date1 TEXT,
  price1 TEXT,
  date2 TEXT,
  price2 TEXT,
  area_total TEXT,
  area_util TEXT,
  area_terreno TEXT,
  quartos INTEGER,
  vagas INTEGER,
  descricao TEXT,
  banco TEXT,
  tipo TEXT,
  estado TEXT,
  cidade TEXT,
  bairro TEXT,
  comarca TEXT,
  oficio TEXT,
  matricula TEXT,
  codigo_origem TEXT,
  data_inclusao TEXT,
  valor_avaliacao TEXT,
  aceita_financiamento BOOLEAN NOT NULL DEFAULT true,
  aceita_fgts BOOLEAN NOT NULL DEFAULT true,
  aceita_parcelamento BOOLEAN NOT NULL DEFAULT true,
  condominio TEXT,
  tributos TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view properties" ON public.properties FOR SELECT USING (true);

-- Only authenticated users (admin) can manage properties
CREATE POLICY "Authenticated users can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update properties" ON public.properties FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete properties" ON public.properties FOR DELETE TO authenticated USING (true);

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

CREATE POLICY "Anyone can view property images" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Authenticated users can upload property images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'property-images');
CREATE POLICY "Authenticated users can update property images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'property-images');
CREATE POLICY "Authenticated users can delete property images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'property-images');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Update all properties with realistic details matching the reference site format

-- Set banco = 'Caixa' for all (reference site is Caixa properties)
UPDATE properties SET banco = 'Caixa' WHERE banco IS NULL OR banco = '';

-- Set valor_avaliacao from old_price where available
UPDATE properties SET valor_avaliacao = old_price WHERE (valor_avaliacao IS NULL OR valor_avaliacao = '') AND old_price IS NOT NULL;

-- Set comarca based on cidade
UPDATE properties SET comarca = cidade || '-PA' WHERE comarca IS NULL OR comarca = '';

-- Set oficio
UPDATE properties SET oficio = '01' WHERE oficio IS NULL OR oficio = '';

-- Set data_inclusao with varied dates
UPDATE properties SET data_inclusao = 
  CASE 
    WHEN (HASHTEXT(id) % 12) = 0 THEN '15/01/2025'
    WHEN (HASHTEXT(id) % 12) = 1 THEN '28/02/2025'
    WHEN (HASHTEXT(id) % 12) = 2 THEN '10/03/2025'
    WHEN (HASHTEXT(id) % 12) = 3 THEN '22/04/2025'
    WHEN (HASHTEXT(id) % 12) = 4 THEN '05/05/2025'
    WHEN (HASHTEXT(id) % 12) = 5 THEN '18/06/2025'
    WHEN (HASHTEXT(id) % 12) = 6 THEN '01/07/2025'
    WHEN (HASHTEXT(id) % 12) = 7 THEN '14/08/2025'
    WHEN (HASHTEXT(id) % 12) = 8 THEN '27/09/2025'
    WHEN (HASHTEXT(id) % 12) = 9 THEN '10/10/2025'
    WHEN (HASHTEXT(id) % 12) = 10 THEN '23/11/2025'
    ELSE '06/12/2025'
  END
WHERE data_inclusao IS NULL OR data_inclusao = '';

-- Set codigo_origem with realistic codes
UPDATE properties SET codigo_origem = '8444' || LPAD((ABS(HASHTEXT(id)) % 9999999999)::text, 10, '0')
WHERE codigo_origem IS NULL OR codigo_origem = '';

-- Set matricula with realistic numbers
UPDATE properties SET matricula = (1000 + ABS(HASHTEXT(id)) % 9000)::text
WHERE matricula IS NULL OR matricula = '';

-- Set area_util with varied sizes (40-120 m²)
UPDATE properties SET area_util = (40 + ABS(HASHTEXT(id || 'util')) % 80)::text || ',00 m²'
WHERE area_util IS NULL OR area_util = '';

-- Set area_terreno with varied sizes (100-400 m²)
UPDATE properties SET area_terreno = (100 + ABS(HASHTEXT(id || 'terreno')) % 300)::text || ',00 m²'
WHERE area_terreno IS NULL OR area_terreno = '';

-- Set quartos (1-4)
UPDATE properties SET quartos = 1 + ABS(HASHTEXT(id || 'quartos')) % 4
WHERE quartos IS NULL;

-- Set vagas (0-2)
UPDATE properties SET vagas = ABS(HASHTEXT(id || 'vagas')) % 3
WHERE vagas IS NULL;

-- Set condominio
UPDATE properties SET condominio = 'Sob responsabilidade do comprador, até o limite de 10% em relação ao valor de avaliação do imóvel.'
WHERE condominio IS NULL OR condominio = '';

-- Set tributos
UPDATE properties SET tributos = 'Sob responsabilidade do comprador.'
WHERE tributos IS NULL OR tributos = '';

-- Generate descricao for properties that don't have one
UPDATE properties SET descricao = 
  bairro || ' - ' || quartos || ' Quartos, Área de Serviço, ' || 
  CASE WHEN quartos >= 2 THEN quartos::text || ' Wc, ' ELSE '1 Wc, ' END ||
  'Sala, Cozinha. ' || address || 
  ' - Condomínio: Sob responsabilidade do comprador, até o limite de 10% em relação ao valor de avaliação do imóvel. A CAIXA realizará o pagamento apenas do valor que exceder o limite de 10% do valor de avaliação. Tributos: Sob responsabilidade do comprador.'
WHERE (descricao IS NULL OR descricao = '') AND bairro IS NOT NULL;

-- Set aceita_financiamento, aceita_fgts, aceita_parcelamento with some variation
-- Most accept, but some don't (like in the reference screenshot)
UPDATE properties SET 
  aceita_financiamento = (ABS(HASHTEXT(id || 'fin')) % 3 != 0),
  aceita_fgts = (ABS(HASHTEXT(id || 'fgts')) % 3 != 0),
  aceita_parcelamento = (ABS(HASHTEXT(id || 'parc')) % 3 != 0)
WHERE true;

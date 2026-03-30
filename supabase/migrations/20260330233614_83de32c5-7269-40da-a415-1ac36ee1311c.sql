UPDATE properties SET 
  price = 'R$ ' || REPLACE(REPLACE(TO_CHAR((FLOOR(RANDOM() * 45000) + 15000)::numeric, 'FM999G999D00'), ',', 'X'), '.', ',') ,
  old_price = 'R$ ' || REPLACE(REPLACE(TO_CHAR((FLOOR(RANDOM() * 150000) + 80000)::numeric, 'FM999G999D00'), ',', 'X'), '.', ',')
WHERE 1=1;
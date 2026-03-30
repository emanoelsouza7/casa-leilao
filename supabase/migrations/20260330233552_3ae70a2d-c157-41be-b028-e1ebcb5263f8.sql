UPDATE properties SET 
  price = 'R$ ' || TO_CHAR((FLOOR(RANDOM() * 45000) + 15000)::numeric, 'FM999G999D00'),
  old_price = 'R$ ' || TO_CHAR((FLOOR(RANDOM() * 150000) + 80000)::numeric, 'FM999G999D00'),
  discount = (FLOOR(RANDOM() * 40) + 30)::text || '%'
WHERE 1=1;
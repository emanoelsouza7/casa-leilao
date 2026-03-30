UPDATE properties SET 
  price = REPLACE(price, 'X', '.'),
  old_price = REPLACE(old_price, 'X', '.')
WHERE price LIKE '%X%' OR old_price LIKE '%X%';
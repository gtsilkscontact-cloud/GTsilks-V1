-- Insert sample sarees
INSERT INTO public.sarees (name, description, price, mrp, state, type, colour, fabric, occasion, stock_quantity, is_featured, is_active)
VALUES
  (
    'Royal Blue Kanchipuram Silk', 
    'Authentic handwoven Kanchipuram silk saree with pure zari border. Features traditional peacock motifs.', 
    15000.00, 
    18000.00, 
    'Tamil Nadu', 
    'Kanchipuram', 
    'Blue', 
    'Silk', 
    'Wedding', 
    5, 
    true, 
    true
  ),
  (
    'Red Banarasi Georgette', 
    'Lightweight Banarasi georgette saree with intricate floral jaal work. Perfect for festive occasions.', 
    8500.00, 
    10500.00, 
    'Uttar Pradesh', 
    'Banarasi', 
    'Red', 
    'Georgette', 
    'Party', 
    10, 
    true, 
    true
  ),
  (
    'Green Dharmavaram Silk', 
    'Traditional Dharmavaram silk saree with contrasting border and pallu. Known for its durability and shine.', 
    12000.00, 
    14000.00, 
    'Andhra Pradesh', 
    'Dharmavaram', 
    'Green', 
    'Silk', 
    'Festival', 
    8, 
    false, 
    true
  );

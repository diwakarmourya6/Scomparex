-- CompareX — 50 smartphone development seed records
-- Designed for the existing public.brands / smartphones / smartphone_specs schema.
-- Development data: verify specifications and prices against official manufacturer sources before production.
BEGIN;

-- 1) Brands
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Apple','apple','https://www.apple.com/in/iphone/','USA',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Samsung','samsung','https://www.samsung.com/in/smartphones/','South Korea',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('OnePlus','oneplus','https://www.oneplus.in/','China',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Google','google','https://store.google.com/in/collection/phones','USA',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Xiaomi','xiaomi','https://www.mi.com/in/','China',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Redmi','redmi','https://www.mi.com/in/redmi/','China',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Realme','realme','https://www.realme.com/in/','China',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('vivo','vivo','https://www.vivo.com/in/','China',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('OPPO','oppo','https://www.oppo.com/in/','China',NOW(),NOW()) ON CONFLICT DO NOTHING;
INSERT INTO public.brands (name,slug,logo_url,country,created_at,updated_at) VALUES ('Motorola','motorola','https://www.motorola.in/','USA',NOW(),NOW()) ON CONFLICT DO NOTHING;

-- 2) Smartphones
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'iphone-15','iPhone 15','iPhone 15',69999,75598,4.5,0,NULL,ARRAY[]::text[],
'iPhone 15 smartphone for CompareX development.',
'6.1-inch OLED display with A16 Bionic and 3349mAh battery.',
ARRAY['6.1-inch OLED','6GB RAM','128GB storage','48MP camera','3349mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='apple'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='iphone-15');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'iphone-15-plus','iPhone 15 Plus','iPhone 15 Plus',79999,86398,4.5,0,NULL,ARRAY[]::text[],
'iPhone 15 Plus smartphone for CompareX development.',
'6.7-inch OLED display with A16 Bionic and 4383mAh battery.',
ARRAY['6.7-inch OLED','6GB RAM','128GB storage','48MP camera','4383mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='apple'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='iphone-15-plus');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'iphone-15-pro','iPhone 15 Pro','iPhone 15 Pro',109999,118798,4.5,0,NULL,ARRAY[]::text[],
'iPhone 15 Pro smartphone for CompareX development.',
'6.1-inch OLED display with A17 Pro and 3274mAh battery.',
ARRAY['6.1-inch OLED','8GB RAM','128GB storage','48MP camera','3274mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='apple'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='iphone-15-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'iphone-15-pro-max','iPhone 15 Pro Max','iPhone 15 Pro Max',129999,140398,4.5,0,NULL,ARRAY[]::text[],
'iPhone 15 Pro Max smartphone for CompareX development.',
'6.7-inch OLED display with A17 Pro and 4441mAh battery.',
ARRAY['6.7-inch OLED','8GB RAM','256GB storage','48MP camera','4441mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='apple'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='iphone-15-pro-max');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'iphone-16','iPhone 16','iPhone 16',69999,75598,4.5,0,NULL,ARRAY[]::text[],
'iPhone 16 smartphone for CompareX development.',
'6.1-inch OLED display with A18 and 3561mAh battery.',
ARRAY['6.1-inch OLED','8GB RAM','128GB storage','48MP camera','3561mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='apple'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='iphone-16');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'galaxy-s24','Galaxy S24','Galaxy S24',59999,64798,4.5,0,NULL,ARRAY[]::text[],
'Galaxy S24 smartphone for CompareX development.',
'6.2-inch AMOLED display with Exynos 2400 and 4000mAh battery.',
ARRAY['6.2-inch AMOLED','8GB RAM','128GB storage','50MP camera','4000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='samsung'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='galaxy-s24');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'galaxy-s24-plus','Galaxy S24+','Galaxy S24+',69999,75598,4.5,0,NULL,ARRAY[]::text[],
'Galaxy S24+ smartphone for CompareX development.',
'6.7-inch AMOLED display with Exynos 2400 and 4900mAh battery.',
ARRAY['6.7-inch AMOLED','12GB RAM','256GB storage','50MP camera','4900mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='samsung'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='galaxy-s24-plus');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'galaxy-s24-ultra','Galaxy S24 Ultra','Galaxy S24 Ultra',109999,118798,4.5,0,NULL,ARRAY[]::text[],
'Galaxy S24 Ultra smartphone for CompareX development.',
'6.8-inch AMOLED display with Snapdragon 8 Gen 3 and 5000mAh battery.',
ARRAY['6.8-inch AMOLED','12GB RAM','256GB storage','200MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='samsung'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='galaxy-s24-ultra');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'galaxy-s25','Galaxy S25','Galaxy S25',74999,80998,4.5,0,NULL,ARRAY[]::text[],
'Galaxy S25 smartphone for CompareX development.',
'6.2-inch AMOLED display with Snapdragon 8 Elite and 4000mAh battery.',
ARRAY['6.2-inch AMOLED','12GB RAM','256GB storage','50MP camera','4000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='samsung'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='galaxy-s25');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'galaxy-s25-ultra','Galaxy S25 Ultra','Galaxy S25 Ultra',119999,129598,4.5,0,NULL,ARRAY[]::text[],
'Galaxy S25 Ultra smartphone for CompareX development.',
'6.9-inch AMOLED display with Snapdragon 8 Elite and 5000mAh battery.',
ARRAY['6.9-inch AMOLED','12GB RAM','256GB storage','200MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='samsung'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='galaxy-s25-ultra');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oneplus-12','OnePlus 12','OnePlus 12',64999,70198,4.5,0,NULL,ARRAY[]::text[],
'OnePlus 12 smartphone for CompareX development.',
'6.82-inch LTPO AMOLED display with Snapdragon 8 Gen 3 and 5400mAh battery.',
ARRAY['6.82-inch LTPO AMOLED','12GB RAM','256GB storage','50MP camera','5400mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oneplus'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oneplus-12');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oneplus-12r','OnePlus 12R','OnePlus 12R',39999,43198,4.5,0,NULL,ARRAY[]::text[],
'OnePlus 12R smartphone for CompareX development.',
'6.78-inch LTPO AMOLED display with Snapdragon 8 Gen 2 and 5500mAh battery.',
ARRAY['6.78-inch LTPO AMOLED','8GB RAM','128GB storage','50MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oneplus'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oneplus-12r');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oneplus-13','OnePlus 13','OnePlus 13',69999,75598,4.5,0,NULL,ARRAY[]::text[],
'OnePlus 13 smartphone for CompareX development.',
'6.82-inch LTPO AMOLED display with Snapdragon 8 Elite and 6000mAh battery.',
ARRAY['6.82-inch LTPO AMOLED','12GB RAM','256GB storage','50MP camera','6000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oneplus'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oneplus-13');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oneplus-nord-4','OnePlus Nord 4','OnePlus Nord 4',29999,32398,4.5,0,NULL,ARRAY[]::text[],
'OnePlus Nord 4 smartphone for CompareX development.',
'6.74-inch AMOLED display with Snapdragon 7+ Gen 3 and 5500mAh battery.',
ARRAY['6.74-inch AMOLED','8GB RAM','128GB storage','50MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oneplus'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oneplus-nord-4');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oneplus-nord-ce4','OnePlus Nord CE4','OnePlus Nord CE4',24999,26998,4.5,0,NULL,ARRAY[]::text[],
'OnePlus Nord CE4 smartphone for CompareX development.',
'6.7-inch AMOLED display with Snapdragon 7 Gen 3 and 5500mAh battery.',
ARRAY['6.7-inch AMOLED','8GB RAM','128GB storage','50MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oneplus'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oneplus-nord-ce4');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'pixel-8','Pixel 8','Pixel 8',49999,53998,4.5,0,NULL,ARRAY[]::text[],
'Pixel 8 smartphone for CompareX development.',
'6.2-inch OLED display with Tensor G3 and 4575mAh battery.',
ARRAY['6.2-inch OLED','8GB RAM','128GB storage','50MP camera','4575mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='google'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='pixel-8');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'pixel-8-pro','Pixel 8 Pro','Pixel 8 Pro',74999,80998,4.5,0,NULL,ARRAY[]::text[],
'Pixel 8 Pro smartphone for CompareX development.',
'6.7-inch OLED display with Tensor G3 and 5050mAh battery.',
ARRAY['6.7-inch OLED','12GB RAM','128GB storage','50MP camera','5050mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='google'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='pixel-8-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'pixel-9','Pixel 9','Pixel 9',64999,70198,4.5,0,NULL,ARRAY[]::text[],
'Pixel 9 smartphone for CompareX development.',
'6.3-inch OLED display with Tensor G4 and 4700mAh battery.',
ARRAY['6.3-inch OLED','12GB RAM','256GB storage','50MP camera','4700mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='google'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='pixel-9');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'pixel-9-pro','Pixel 9 Pro','Pixel 9 Pro',89999,97198,4.5,0,NULL,ARRAY[]::text[],
'Pixel 9 Pro smartphone for CompareX development.',
'6.3-inch OLED display with Tensor G4 and 4700mAh battery.',
ARRAY['6.3-inch OLED','16GB RAM','256GB storage','50MP camera','4700mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='google'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='pixel-9-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'pixel-9-pro-xl','Pixel 9 Pro XL','Pixel 9 Pro XL',99999,107998,4.5,0,NULL,ARRAY[]::text[],
'Pixel 9 Pro XL smartphone for CompareX development.',
'6.8-inch OLED display with Tensor G4 and 5060mAh battery.',
ARRAY['6.8-inch OLED','16GB RAM','256GB storage','50MP camera','5060mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='google'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='pixel-9-pro-xl');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'xiaomi-14','Xiaomi 14','Xiaomi 14',69999,75598,4.5,0,NULL,ARRAY[]::text[],
'Xiaomi 14 smartphone for CompareX development.',
'6.36-inch LTPO AMOLED display with Snapdragon 8 Gen 3 and 4610mAh battery.',
ARRAY['6.36-inch LTPO AMOLED','12GB RAM','512GB storage','50MP camera','4610mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='xiaomi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='xiaomi-14');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'xiaomi-14-ultra','Xiaomi 14 Ultra','Xiaomi 14 Ultra',99999,107998,4.5,0,NULL,ARRAY[]::text[],
'Xiaomi 14 Ultra smartphone for CompareX development.',
'6.73-inch LTPO AMOLED display with Snapdragon 8 Gen 3 and 5000mAh battery.',
ARRAY['6.73-inch LTPO AMOLED','16GB RAM','512GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='xiaomi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='xiaomi-14-ultra');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'xiaomi-14-civi','Xiaomi 14 CIVI','Xiaomi 14 CIVI',39999,43198,4.5,0,NULL,ARRAY[]::text[],
'Xiaomi 14 CIVI smartphone for CompareX development.',
'6.55-inch AMOLED display with Snapdragon 8s Gen 3 and 4700mAh battery.',
ARRAY['6.55-inch AMOLED','8GB RAM','256GB storage','50MP camera','4700mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='xiaomi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='xiaomi-14-civi');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'xiaomi-15','Xiaomi 15','Xiaomi 15',64999,70198,4.5,0,NULL,ARRAY[]::text[],
'Xiaomi 15 smartphone for CompareX development.',
'6.36-inch LTPO AMOLED display with Snapdragon 8 Elite and 5240mAh battery.',
ARRAY['6.36-inch LTPO AMOLED','12GB RAM','256GB storage','50MP camera','5240mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='xiaomi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='xiaomi-15');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'xiaomi-15-ultra','Xiaomi 15 Ultra','Xiaomi 15 Ultra',109999,118798,4.5,0,NULL,ARRAY[]::text[],
'Xiaomi 15 Ultra smartphone for CompareX development.',
'6.73-inch LTPO AMOLED display with Snapdragon 8 Elite and 5410mAh battery.',
ARRAY['6.73-inch LTPO AMOLED','16GB RAM','512GB storage','50MP camera','5410mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='xiaomi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='xiaomi-15-ultra');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'redmi-note-13-5g','Redmi Note 13 5G','Redmi Note 13 5G',17999,19438,4.5,0,NULL,ARRAY[]::text[],
'Redmi Note 13 5G smartphone for CompareX development.',
'6.67-inch AMOLED display with Dimensity 6080 and 5000mAh battery.',
ARRAY['6.67-inch AMOLED','6GB RAM','128GB storage','108MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='redmi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='redmi-note-13-5g');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'redmi-note-13-pro','Redmi Note 13 Pro','Redmi Note 13 Pro',24999,26998,4.5,0,NULL,ARRAY[]::text[],
'Redmi Note 13 Pro smartphone for CompareX development.',
'6.67-inch AMOLED display with Snapdragon 7s Gen 2 and 5100mAh battery.',
ARRAY['6.67-inch AMOLED','8GB RAM','128GB storage','200MP camera','5100mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='redmi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='redmi-note-13-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'redmi-note-13-pro-plus','Redmi Note 13 Pro+','Redmi Note 13 Pro+',31999,34558,4.5,0,NULL,ARRAY[]::text[],
'Redmi Note 13 Pro+ smartphone for CompareX development.',
'6.67-inch AMOLED display with Dimensity 7200 Ultra and 5000mAh battery.',
ARRAY['6.67-inch AMOLED','8GB RAM','256GB storage','200MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='redmi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='redmi-note-13-pro-plus');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'redmi-note-14-5g','Redmi Note 14 5G','Redmi Note 14 5G',18999,20518,4.5,0,NULL,ARRAY[]::text[],
'Redmi Note 14 5G smartphone for CompareX development.',
'6.67-inch AMOLED display with Dimensity 7025 Ultra and 5110mAh battery.',
ARRAY['6.67-inch AMOLED','8GB RAM','128GB storage','50MP camera','5110mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='redmi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='redmi-note-14-5g');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'redmi-note-14-pro','Redmi Note 14 Pro','Redmi Note 14 Pro',24999,26998,4.5,0,NULL,ARRAY[]::text[],
'Redmi Note 14 Pro smartphone for CompareX development.',
'6.67-inch AMOLED display with Dimensity 7300 Ultra and 5500mAh battery.',
ARRAY['6.67-inch AMOLED','8GB RAM','128GB storage','200MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='redmi'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='redmi-note-14-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'realme-gt-6','realme GT 6','realme GT 6',39999,43198,4.5,0,NULL,ARRAY[]::text[],
'realme GT 6 smartphone for CompareX development.',
'6.78-inch LTPO AMOLED display with Snapdragon 8s Gen 3 and 5500mAh battery.',
ARRAY['6.78-inch LTPO AMOLED','8GB RAM','256GB storage','50MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='realme'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='realme-gt-6');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'realme-gt-7-pro','realme GT 7 Pro','realme GT 7 Pro',59999,64798,4.5,0,NULL,ARRAY[]::text[],
'realme GT 7 Pro smartphone for CompareX development.',
'6.78-inch LTPO AMOLED display with Snapdragon 8 Elite and 6500mAh battery.',
ARRAY['6.78-inch LTPO AMOLED','12GB RAM','256GB storage','50MP camera','6500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='realme'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='realme-gt-7-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'realme-13-pro-plus','realme 13 Pro+','realme 13 Pro+',29999,32398,4.5,0,NULL,ARRAY[]::text[],
'realme 13 Pro+ smartphone for CompareX development.',
'6.7-inch OLED display with Snapdragon 7s Gen 2 and 5200mAh battery.',
ARRAY['6.7-inch OLED','8GB RAM','256GB storage','50MP camera','5200mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='realme'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='realme-13-pro-plus');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'realme-p1-pro','realme P1 Pro','realme P1 Pro',21999,23758,4.5,0,NULL,ARRAY[]::text[],
'realme P1 Pro smartphone for CompareX development.',
'6.7-inch OLED display with Snapdragon 7s Gen 2 and 5000mAh battery.',
ARRAY['6.7-inch OLED','8GB RAM','128GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='realme'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='realme-p1-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'realme-12-pro-plus','realme 12 Pro+','realme 12 Pro+',29999,32398,4.5,0,NULL,ARRAY[]::text[],
'realme 12 Pro+ smartphone for CompareX development.',
'6.7-inch OLED display with Snapdragon 7s Gen 2 and 5000mAh battery.',
ARRAY['6.7-inch OLED','8GB RAM','256GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='realme'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='realme-12-pro-plus');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'vivo-x100','vivo X100','vivo X100',59999,64798,4.5,0,NULL,ARRAY[]::text[],
'vivo X100 smartphone for CompareX development.',
'6.78-inch LTPO AMOLED display with Dimensity 9300 and 5000mAh battery.',
ARRAY['6.78-inch LTPO AMOLED','12GB RAM','256GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='vivo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='vivo-x100');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'vivo-x100-pro','vivo X100 Pro','vivo X100 Pro',89999,97198,4.5,0,NULL,ARRAY[]::text[],
'vivo X100 Pro smartphone for CompareX development.',
'6.78-inch LTPO AMOLED display with Dimensity 9300 and 5400mAh battery.',
ARRAY['6.78-inch LTPO AMOLED','16GB RAM','512GB storage','50MP camera','5400mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='vivo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='vivo-x100-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'vivo-v40','vivo V40','vivo V40',34999,37798,4.5,0,NULL,ARRAY[]::text[],
'vivo V40 smartphone for CompareX development.',
'6.78-inch AMOLED display with Snapdragon 7 Gen 3 and 5500mAh battery.',
ARRAY['6.78-inch AMOLED','8GB RAM','128GB storage','50MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='vivo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='vivo-v40');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'vivo-v40-pro','vivo V40 Pro','vivo V40 Pro',49999,53998,4.5,0,NULL,ARRAY[]::text[],
'vivo V40 Pro smartphone for CompareX development.',
'6.78-inch AMOLED display with Dimensity 9200+ and 5500mAh battery.',
ARRAY['6.78-inch AMOLED','12GB RAM','512GB storage','50MP camera','5500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='vivo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='vivo-v40-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'vivo-x200','vivo X200','vivo X200',65999,71278,4.5,0,NULL,ARRAY[]::text[],
'vivo X200 smartphone for CompareX development.',
'6.67-inch LTPO AMOLED display with Dimensity 9400 and 5800mAh battery.',
ARRAY['6.67-inch LTPO AMOLED','12GB RAM','256GB storage','50MP camera','5800mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='vivo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='vivo-x200');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oppo-reno-12-pro','OPPO Reno12 Pro','OPPO Reno12 Pro',36999,39958,4.5,0,NULL,ARRAY[]::text[],
'OPPO Reno12 Pro smartphone for CompareX development.',
'6.7-inch AMOLED display with Dimensity 7300-Energy and 5000mAh battery.',
ARRAY['6.7-inch AMOLED','12GB RAM','256GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oppo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oppo-reno-12-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oppo-reno-13-pro','OPPO Reno13 Pro','OPPO Reno13 Pro',49999,53998,4.5,0,NULL,ARRAY[]::text[],
'OPPO Reno13 Pro smartphone for CompareX development.',
'6.83-inch AMOLED display with Dimensity 8350 and 5800mAh battery.',
ARRAY['6.83-inch AMOLED','12GB RAM','256GB storage','50MP camera','5800mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oppo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oppo-reno-13-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oppo-f27-pro-plus','OPPO F27 Pro+','OPPO F27 Pro+',27999,30238,4.5,0,NULL,ARRAY[]::text[],
'OPPO F27 Pro+ smartphone for CompareX development.',
'6.7-inch AMOLED display with Dimensity 7050 and 5000mAh battery.',
ARRAY['6.7-inch AMOLED','8GB RAM','128GB storage','64MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oppo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oppo-f27-pro-plus');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oppo-find-x8','OPPO Find X8','OPPO Find X8',69999,75598,4.5,0,NULL,ARRAY[]::text[],
'OPPO Find X8 smartphone for CompareX development.',
'6.59-inch AMOLED display with Dimensity 9400 and 5630mAh battery.',
ARRAY['6.59-inch AMOLED','12GB RAM','256GB storage','50MP camera','5630mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oppo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oppo-find-x8');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'oppo-find-x8-pro','OPPO Find X8 Pro','OPPO Find X8 Pro',99999,107998,4.5,0,NULL,ARRAY[]::text[],
'OPPO Find X8 Pro smartphone for CompareX development.',
'6.78-inch LTPO AMOLED display with Dimensity 9400 and 5910mAh battery.',
ARRAY['6.78-inch LTPO AMOLED','16GB RAM','512GB storage','50MP camera','5910mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='oppo'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='oppo-find-x8-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'motorola-edge-50-pro','Motorola Edge 50 Pro','Motorola Edge 50 Pro',34999,37798,4.5,0,NULL,ARRAY[]::text[],
'Motorola Edge 50 Pro smartphone for CompareX development.',
'6.7-inch pOLED display with Snapdragon 7 Gen 3 and 4500mAh battery.',
ARRAY['6.7-inch pOLED','8GB RAM','256GB storage','50MP camera','4500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='motorola'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='motorola-edge-50-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'motorola-edge-50-ultra','Motorola Edge 50 Ultra','Motorola Edge 50 Ultra',54999,59398,4.5,0,NULL,ARRAY[]::text[],
'Motorola Edge 50 Ultra smartphone for CompareX development.',
'6.67-inch pOLED display with Snapdragon 8s Gen 3 and 4500mAh battery.',
ARRAY['6.67-inch pOLED','12GB RAM','512GB storage','50MP camera','4500mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='motorola'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='motorola-edge-50-ultra');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'motorola-edge-50-fusion','Motorola Edge 50 Fusion','Motorola Edge 50 Fusion',22999,24838,4.5,0,NULL,ARRAY[]::text[],
'Motorola Edge 50 Fusion smartphone for CompareX development.',
'6.7-inch pOLED display with Snapdragon 7s Gen 2 and 5000mAh battery.',
ARRAY['6.7-inch pOLED','8GB RAM','128GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='motorola'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='motorola-edge-50-fusion');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'motorola-edge-60-pro','Motorola Edge 60 Pro','Motorola Edge 60 Pro',29999,32398,4.5,0,NULL,ARRAY[]::text[],
'Motorola Edge 60 Pro smartphone for CompareX development.',
'6.7-inch pOLED display with Dimensity 8350 and 6000mAh battery.',
ARRAY['6.7-inch pOLED','8GB RAM','256GB storage','50MP camera','6000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='motorola'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='motorola-edge-60-pro');
INSERT INTO public.smartphones
(brand_id,slug,name,model,price,original_price,rating,review_count,image,gallery_images,description,short_description,highlights,availability,release_date,best_for,score_overall,score_performance,score_camera,score_battery,score_display,score_value,pros,cons,offers,created_at,updated_at)
SELECT b.id,'moto-g85-5g','Moto G85 5G','Moto G85 5G',17999,19438,4.5,0,NULL,ARRAY[]::text[],
'Moto G85 5G smartphone for CompareX development.',
'6.67-inch pOLED display with Snapdragon 6s Gen 3 and 5000mAh battery.',
ARRAY['6.67-inch pOLED','8GB RAM','128GB storage','50MP camera','5000mAh battery']::text[],
'In Stock','2025','Everyday use, performance and value',85,88,86,90,88,82,
ARRAY['Good display','5G connectivity','Strong everyday performance']::text[],
ARRAY['No microSD expansion','Specifications/prices should be verified']::text[],
'{}'::jsonb,NOW(),NOW()
FROM public.brands b WHERE b.slug='motorola'
AND NOT EXISTS (SELECT 1 FROM public.smartphones s WHERE s.slug='moto-g85-5g');

-- 3) Smartphone specifications
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.1-inch OLED',6.1,'OLED','2400 x 1080',60,NULL,'Manufacturer-rated protection','19.5:9','HDR','A16 Bionic','Octa-core','Integrated/Adreno-class GPU',6,'LPDDR5X',128,'UFS',FALSE,NULL,'48MP main camera',48,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],3349,20,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='iphone-15'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch OLED',6.7,'OLED','2400 x 1080',60,NULL,'Manufacturer-rated protection','19.5:9','HDR','A16 Bionic','Octa-core','Integrated/Adreno-class GPU',6,'LPDDR5X',128,'UFS',FALSE,NULL,'48MP main camera',48,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4383,20,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='iphone-15-plus'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.1-inch OLED',6.1,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','A17 Pro','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'48MP main camera',48,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],3274,20,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='iphone-15-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch OLED',6.7,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','A17 Pro','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'48MP main camera',48,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4441,20,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='iphone-15-pro-max'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.1-inch OLED',6.1,'OLED','2400 x 1080',60,NULL,'Manufacturer-rated protection','19.5:9','HDR','A18','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'48MP main camera',48,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],3561,25,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='iphone-16'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.2-inch AMOLED',6.2,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Exynos 2400','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4000,25,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='galaxy-s24'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch AMOLED',6.7,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Exynos 2400','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4900,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='galaxy-s24-plus'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.8-inch AMOLED',6.8,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Gen 3','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'200MP main camera',200,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='galaxy-s24-ultra'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.2-inch AMOLED',6.2,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Elite','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4000,25,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='galaxy-s25'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.9-inch AMOLED',6.9,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Elite','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'200MP main camera',200,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='galaxy-s25-ultra'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.82-inch LTPO AMOLED',6.82,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Gen 3','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5400,100,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oneplus-12'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch LTPO AMOLED',6.78,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Gen 2','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,100,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oneplus-12r'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.82-inch LTPO AMOLED',6.82,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Elite','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],6000,100,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oneplus-13'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.74-inch AMOLED',6.74,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7+ Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,100,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oneplus-nord-4'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch AMOLED',6.7,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7 Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,100,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oneplus-nord-ce4'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.2-inch OLED',6.2,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Tensor G3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4575,27,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='pixel-8'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch OLED',6.7,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Tensor G3','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5050,30,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='pixel-8-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.3-inch OLED',6.3,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Tensor G4','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4700,27,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='pixel-9'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.3-inch OLED',6.3,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Tensor G4','Octa-core','Integrated/Adreno-class GPU',16,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4700,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='pixel-9-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.8-inch OLED',6.8,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Tensor G4','Octa-core','Integrated/Adreno-class GPU',16,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5060,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='pixel-9-pro-xl'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.36-inch LTPO AMOLED',6.36,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Gen 3','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4610,90,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='xiaomi-14'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.73-inch LTPO AMOLED',6.73,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Gen 3','Octa-core','Integrated/Adreno-class GPU',16,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,90,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='xiaomi-14-ultra'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.55-inch AMOLED',6.55,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8s Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4700,67,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='xiaomi-14-civi'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.36-inch LTPO AMOLED',6.36,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Elite','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5240,90,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='xiaomi-15'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.73-inch LTPO AMOLED',6.73,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Elite','Octa-core','Integrated/Adreno-class GPU',16,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5410,90,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='xiaomi-15-ultra'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch AMOLED',6.67,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 6080','Octa-core','Integrated/Adreno-class GPU',6,'LPDDR5X',128,'UFS',FALSE,NULL,'108MP main camera',108,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,33,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='redmi-note-13-5g'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch AMOLED',6.67,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7s Gen 2','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'200MP main camera',200,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5100,67,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='redmi-note-13-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch AMOLED',6.67,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 7200 Ultra','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'200MP main camera',200,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,120,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='redmi-note-13-pro-plus'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch AMOLED',6.67,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 7025 Ultra','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5110,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='redmi-note-14-5g'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch AMOLED',6.67,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 7300 Ultra','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'200MP main camera',200,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='redmi-note-14-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch LTPO AMOLED',6.78,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8s Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,120,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='realme-gt-6'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch LTPO AMOLED',6.78,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8 Elite','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],6500,120,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='realme-gt-7-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch OLED',6.7,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7s Gen 2','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5200,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='realme-13-pro-plus'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch OLED',6.7,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7s Gen 2','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,45,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='realme-p1-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch OLED',6.7,'OLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7s Gen 2','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,67,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='realme-12-pro-plus'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch LTPO AMOLED',6.78,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 9300','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,120,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='vivo-x100'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch LTPO AMOLED',6.78,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 9300','Octa-core','Integrated/Adreno-class GPU',16,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5400,100,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='vivo-x100-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch AMOLED',6.78,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7 Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='vivo-v40'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch AMOLED',6.78,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 9200+','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5500,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='vivo-v40-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch LTPO AMOLED',6.67,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 9400','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5800,90,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='vivo-x200'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch AMOLED',6.7,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 7300-Energy','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oppo-reno-12-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.83-inch AMOLED',6.83,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 8350','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5800,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oppo-reno-13-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch AMOLED',6.7,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 7050','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'64MP main camera',64,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,67,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oppo-f27-pro-plus'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.59-inch AMOLED',6.59,'AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 9400','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5630,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oppo-find-x8'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.78-inch LTPO AMOLED',6.78,'LTPO AMOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 9400','Octa-core','Integrated/Adreno-class GPU',16,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5910,80,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='oppo-find-x8-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch pOLED',6.7,'pOLED','2400 x 1080',144,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7 Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4500,125,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='motorola-edge-50-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch pOLED',6.67,'pOLED','2400 x 1080',144,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 8s Gen 3','Octa-core','Integrated/Adreno-class GPU',12,'LPDDR5X',512,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],4500,125,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='motorola-edge-50-ultra'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch pOLED',6.7,'pOLED','2400 x 1080',144,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 7s Gen 2','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,68,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='motorola-edge-50-fusion'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.7-inch pOLED',6.7,'pOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Dimensity 8350','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',256,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],6000,90,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='motorola-edge-60-pro'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);
INSERT INTO public.smartphone_specs
(smartphone_id,display_size,display_size_number,display_type,display_resolution,refresh_rate,peak_brightness,display_protection,aspect_ratio,hdr_support,processor,cpu,gpu,ram,ram_type,storage,storage_type,expandable_storage,antutu_score,main_camera,main_sensor_mp,ultrawide,telephoto,telephoto_mp,front_camera,front_camera_mp,video,ois,camera_features,battery_capacity,charging_speed,wireless_charging,wireless_charging_speed,reverse_charging,battery_life_hours,five_g,wifi,bluetooth,nfc,usb,sim,os,os_version,update_support_years,weight,dimensions,ip_rating,build_materials,colors,created_at,updated_at)
SELECT s.id,'6.67-inch pOLED',6.67,'pOLED','2400 x 1080',120,NULL,'Manufacturer-rated protection','19.5:9','HDR','Snapdragon 6s Gen 3','Octa-core','Integrated/Adreno-class GPU',8,'LPDDR5X',128,'UFS',FALSE,NULL,'50MP main camera',50,'Ultra-wide camera where applicable',NULL,NULL,'Front camera',NULL,'Up to 4K video',TRUE,ARRAY['HDR','Night mode','Portrait']::text[],5000,30,FALSE,NULL,FALSE,20.0,TRUE,'Wi-Fi 6/7','Bluetooth 5.x',TRUE,'USB Type-C','Dual SIM / eSIM where supported','Android / iOS','Current supported version',5,NULL,NULL,'IP-rated where applicable','Glass/aluminium/polymer',ARRAY['Black','Blue','Silver']::text[],NOW(),NOW()
FROM public.smartphones s
WHERE s.slug='moto-g85-5g'
AND NOT EXISTS (SELECT 1 FROM public.smartphone_specs sp WHERE sp.smartphone_id=s.id);

-- 4) Verification
SELECT COUNT(*) AS brands_count FROM public.brands;
SELECT COUNT(*) AS smartphones_count FROM public.smartphones;
SELECT COUNT(*) AS smartphone_specs_count FROM public.smartphone_specs;
SELECT s.id,b.name AS brand,s.name,s.price FROM public.smartphones s JOIN public.brands b ON b.id=s.brand_id ORDER BY s.id DESC LIMIT 50;
COMMIT;
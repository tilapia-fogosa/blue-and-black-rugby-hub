-- Verificar URLs das fotos
SELECT id, name, photo_url FROM athlete_registrations WHERE photo_url IS NOT NULL LIMIT 5;

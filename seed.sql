-- Insert Events
insert into public.events (title, date, time, location, type, opponent, description) values
('Campeonato Regional', '2024-08-15', '14:00:00', 'Estádio Municipal', 'Jogo', 'Lions RFC', null),
('Treino Aberto', '2024-08-20', '18:00:00', 'Campo de Treino', 'Treino', null, 'Venha conhecer nosso time'),
('Final do Campeonato', '2024-09-01', '16:00:00', 'Arena Central', 'Final', 'Wolves United', null),
('Evento de Arrecadação', '2024-09-10', '19:00:00', 'Clube Social', 'Social', null, 'Jantar beneficente');

-- Insert Galleries (assuming we can get event IDs later, but for seed we'll leave event_id null or assume order)
insert into public.galleries (title, category, cover_image_url) values
('Jogos do Campeonato', 'Jogos', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=500&fit=crop'),
('Treinos da Temporada', 'Treinos', 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500&h=500&fit=crop'),
('Confraternização', 'Eventos', 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=500&fit=crop');

-- Insert Gallery Images (linking to galleries by title subquery for simplicity in seed)
with gallery_jogos as (select id from public.galleries where title = 'Jogos do Campeonato' limit 1),
     gallery_treinos as (select id from public.galleries where title = 'Treinos da Temporada' limit 1)
insert into public.gallery_images (gallery_id, image_url, alt_text) values
((select id from gallery_jogos), 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=500&fit=crop', 'Time em ação'),
((select id from gallery_jogos), 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=500&h=500&fit=crop', 'Vitória da equipe'),
((select id from gallery_treinos), 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500&h=500&fit=crop', 'Treinamento intenso');

-- Insert Athletes
insert into public.athletes (name, position, achievements, years, description, photo_url) values
('Carlos Silva', 'Capitão - Centro', '3x Campeão Nacional, Seleção Brasileira', '2010-2024', 'Líder exemplar e um dos maiores pontuadores da história do clube.', null),
('Roberto Santos', 'Pilar - Forward', 'Campeão Sul-Americano, Melhor Jogador 2018', '2015-2023', 'Força imparável no scrum e referência técnica na posição.', null),
('Miguel Torres', 'Meio-Scrum', '2x Campeão Regional, Artilheiro 2020', '2018-2024', 'Estrategista do time com visão de jogo excepcional.', null),
('André Costa', 'Asa - Back', 'Velocista do Ano, Seleção Juvenil', '2020-2024', 'Jovem promessa com velocidade e agilidade impressionantes.', null);

-- Insert Sponsors
insert into public.sponsors (name, category, tier) values
('SportTech', 'Equipamentos Esportivos', 'Principal'),
('FitNutrition', 'Suplementos', 'Premium'),
('Banco Regional', 'Serviços Financeiros', 'Apoiador'),
('Clínica Vida', 'Saúde e Medicina Esportiva', 'Apoiador');

-- Insert History
insert into public.history (year, title, description) values
('1985', 'Fundação do Clube', 'Pé Vermelho Rugby foi fundado por um grupo de entusiastas do rugby, com o objetivo de promover o esporte na região.'),
('1992', 'Primeiro Campeonato', 'Conquistamos nosso primeiro título regional, marcando o início de uma trajetória vitoriosa.'),
('2001', 'Nova Sede', 'Inauguração de nossa sede própria com campo oficial e instalações modernas para treinamento.'),
('2010', 'Campeonato Nacional', 'Histórica conquista do campeonato nacional, elevando o clube ao patamar de elite do rugby brasileiro.'),
('2018', 'Centro de Formação', 'Criação do centro de formação de novos talentos, investindo no futuro do rugby.'),
('2023', '40 Anos de Tradição', 'Celebramos quase quatro décadas de história, com mais de 15 títulos conquistados.');

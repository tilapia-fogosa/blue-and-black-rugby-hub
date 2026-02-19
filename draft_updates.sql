-- Adicionar colunas para suporte ao Draft na tabela athlete_registrations
-- Isso permite persistir a seleção dos times diretamente no registro do atleta.

ALTER TABLE athlete_registrations 
ADD COLUMN IF NOT EXISTS draft_team TEXT DEFAULT 'Pool'; -- Valores esperados: 'Team A', 'Team B', 'Team C', 'Team D', 'Pool'

ALTER TABLE athlete_registrations 
ADD COLUMN IF NOT EXISTS draft_position_group TEXT; -- Valores esperados: 'Forward', 'Back'. Será preenchido com base na posição preferida.

-- Opcional: Criar índice para performance se houver muitos atletas
CREATE INDEX IF NOT EXISTS idx_athlete_registrations_draft_team ON athlete_registrations(draft_team);
CREATE INDEX IF NOT EXISTS idx_athlete_registrations_category ON athlete_registrations(category);

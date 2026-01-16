-- Adicionar políticas de escrita para permitir operações CRUD
-- IMPORTANTE: Execute este SQL no Supabase após criar o schema inicial

-- Policies para Events
CREATE POLICY "Allow all operations on events" ON public.events FOR ALL USING (true) WITH CHECK (true);

-- Policies para Galleries
CREATE POLICY "Allow all operations on galleries" ON public.galleries FOR ALL USING (true) WITH CHECK (true);

-- Policies para Gallery Images
CREATE POLICY "Allow all operations on gallery_images" ON public.gallery_images FOR ALL USING (true) WITH CHECK (true);

-- Policies para Athletes
CREATE POLICY "Allow all operations on athletes" ON public.athletes FOR ALL USING (true) WITH CHECK (true);

-- Policies para Sponsors
CREATE POLICY "Allow all operations on sponsors" ON public.sponsors FOR ALL USING (true) WITH CHECK (true);

-- Policies para History
CREATE POLICY "Allow all operations on history" ON public.history FOR ALL USING (true) WITH CHECK (true);

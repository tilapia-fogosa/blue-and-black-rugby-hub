import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Extrair informações da connection string
const connectionString = 'postgresql://postgres:angatu00decor@db.zkwwnztulyydgdplsgpy.supabase.co:5432/postgres';
const projectRef = 'zkwwnztulyydgdplsgpy';
const password = 'angatu00decor';

const supabaseUrl = `https://${projectRef}.supabase.co`;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

async function setupDatabase() {
    console.log('🔌 Configurando banco de dados no Supabase...\n');

    if (!supabaseServiceKey) {
        console.log('⚠️  SUPABASE_SERVICE_KEY não encontrada no ambiente.');
        console.log('\n📋 Para executar este script automaticamente, você precisa:');
        console.log('1. Ir para: https://supabase.com/dashboard/project/' + projectRef + '/settings/api');
        console.log('2. Copiar a "service_role" key (não a anon key!)');
        console.log('3. Executar: $env:SUPABASE_SERVICE_KEY="sua_service_key_aqui"; node setup-database-supabase.js\n');
        console.log('🔧 ALTERNATIVA RECOMENDADA:');
        console.log('Use o SQL Editor do Supabase para executar os arquivos schema.sql e seed.sql');
        console.log('Veja o arquivo SETUP_DATABASE.md para instruções detalhadas.\n');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // Ler os arquivos SQL
        const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
        const seedSQL = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');

        console.log('📋 Executando schema.sql...');

        // Dividir o schema em comandos individuais
        const schemaCommands = schemaSQL
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

        for (const command of schemaCommands) {
            const { error } = await supabase.rpc('exec_sql', { sql: command });
            if (error) {
                console.error('❌ Erro ao executar comando:', command.substring(0, 50) + '...');
                console.error('Erro:', error);
            }
        }

        console.log('✅ Schema criado!\n');

        console.log('🌱 Executando seed.sql...');

        // Dividir o seed em comandos individuais
        const seedCommands = seedSQL
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

        for (const command of seedCommands) {
            const { error } = await supabase.rpc('exec_sql', { sql: command });
            if (error) {
                console.error('❌ Erro ao executar comando:', command.substring(0, 50) + '...');
                console.error('Erro:', error);
            }
        }

        console.log('✅ Dados inseridos!\n');
        console.log('🎉 Database configurado com sucesso!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.error('\n💡 Use o SQL Editor do Supabase como alternativa.');
        console.error('Veja o arquivo SETUP_DATABASE.md para instruções.\n');
        process.exit(1);
    }
}

setupDatabase();

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:angatu00decor@db.zkwwnztulyydgdplsgpy.supabase.co:5432/postgres';

async function setupDatabase() {
    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('🔌 Conectando ao Supabase...');
        await client.connect();
        console.log('✅ Conectado com sucesso!\n');

        // Executar schema.sql
        console.log('📋 Criando tabelas...');
        const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
        await client.query(schemaSQL);
        console.log('✅ Tabelas criadas com sucesso!\n');

        // Executar seed.sql
        console.log('🌱 Inserindo dados iniciais...');
        const seedSQL = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
        await client.query(seedSQL);
        console.log('✅ Dados inseridos com sucesso!\n');

        console.log('🎉 Database configurado com sucesso!');
        console.log('\nTabelas criadas:');
        console.log('  - events');
        console.log('  - galleries');
        console.log('  - gallery_images');
        console.log('  - athletes');
        console.log('  - sponsors');
        console.log('  - history');

    } catch (error) {
        console.error('❌ Erro ao configurar database:', error.message);
        if (error.detail) {
            console.error('Detalhes:', error.detail);
        }
        if (error.stack) {
            console.error('Stack:', error.stack);
        }
        console.error('\nErro completo:', error);
        process.exit(1);
    } finally {
        try {
            await client.end();
        } catch (e) {
            // Ignorar erros ao fechar conexão
        }
    }
}

setupDatabase();

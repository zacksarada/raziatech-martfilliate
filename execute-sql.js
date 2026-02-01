const { Client } = require('pg');

// Parse DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;
const url = new URL(databaseUrl.replace('postgresql://', 'http://'));

const client = new Client({
  host: url.hostname,
  port: url.port,
  database: url.pathname.substring(1),
  user: url.username,
  password: url.password,
  ssl: {
    rejectUnauthorized: false
  }
});

async function executeSQL() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');
    
    // Read SQL file
    const fs = require('fs');
    const sql = fs.readFileSync('create-tables.sql', 'utf8');
    
    console.log('Executing SQL...');
    const result = await client.query(sql);
    
    console.log('\n✅ Tables created successfully!');
    console.log('\n📊 Result:');
    if (result.rows) {
      result.rows.forEach(row => {
        console.log(`   ${row.table_name}: ${row.row_count} rows`);
      });
    }
    
    console.log('\n🎉 Database setup completed!');
    console.log('\n🔑 Test Users:');
    console.log('   👑 Admin: admin@raziatech.com / admin123');
    console.log('   👤 Affiliate: affiliate@test.com / affiliate123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

executeSQL();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS members (
  fname VARCHAR ( 255 ), 
  lname VARCHAR ( 255 ),
  email VARCHAR ( 255 ) UNIQUE,
  password VARCHAR ( 255 ),
  status VARCHAR ( 255 )
);`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://stefanvitanov:rino@localhost:5432/<db name>",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
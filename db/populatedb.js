const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS members (
  fname VARCHAR ( 255 ), 
  lname VARCHAR ( 255 ),
  email VARCHAR ( 255 ) UNIQUE PRIMARY KEY,
  password VARCHAR ( 255 ),
  status VARCHAR ( 255 ),
  admin BIT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR ( 255 ) references members(email) NOT NULL,
    message VARCHAR ( 500 ),
    date VARCHAR ( 255 ) NOT NULL 
  );
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://stefanvitanov:rino@localhost:5432/membersonly",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
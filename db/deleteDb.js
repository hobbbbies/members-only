const { Client } = require("pg");

const SQL = `
    DROP TABLE messages;
    DROP TABLE members;
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
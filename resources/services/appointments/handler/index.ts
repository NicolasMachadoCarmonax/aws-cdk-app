import { Client } from "pg";

exports.handler = async () => {
// let client;
//   if (!client) {
//     client = new Client({
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });
//     await client.connect();
//   }

//   let responseMessage = "Connected successfully";

//   try {
//     const res = await client.query("SELECT NOW()");
//     console.log(res.rows[0]);
//   } catch (err) {
//     console.error(err);
//     responseMessage = "Failed to execute query";
//   }

//   const response = {
//     statusCode: 200,
//     body: JSON.stringify(responseMessage),
//   };

//   return response;
return {status: 200, body: 'Hello'}
};

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { Client } = require('pg');

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const client = new Client({
    host: 'database-1.c3cow0uiy44z.ap-northeast-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'As19831007',
    database: 'postgres',
  });

  const userId = event.queryStringParameters?.userId;

  try {
    await client.connect();

    let query = `
      SELECT 
        l."貸出ID", 
        l."利用者ID", 
        u."名前" AS "利用者名",
        l."書籍ID", 
        b."タイトル" AS "書籍タイトル",
        l."貸出日", 
        l."返却期限", 
        CASE 
          WHEN l."返却済み" THEN 'はい'
          ELSE 'いいえ'
        END AS "返却済み",
        l."返却日"
      FROM "貸出管理" l
      JOIN "利用者" u ON l."利用者ID" = u."利用者ID"
      JOIN "書籍" b ON l."書籍ID" = b."書籍ID"
    `;

    const values = [];

    if (userId) {
      query += ` WHERE l."利用者ID" = $1`;
      values.push(userId);
    }

    const res = await client.query(query, values);
    console.log("📚 検索結果:", res.rows);

    await client.end();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(res.rows),
    };
  } catch (error) {
    console.error("❌ DB接続エラー:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

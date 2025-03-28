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

  try {
    await client.connect();

    const query = `
        SELECT
        l."貸出id",
        l."利用者id",
        u."名前" AS "利用者名",
        l."書籍id",
        b."タイトル" AS "書籍タイトル",
        l."貸出日",
        l."返却期限",
        CASE
            WHEN l."返却済み" = true THEN 'はい'
            ELSE 'いいえ'
        END AS "返却済み",
        l."返却日"
        FROM "貸出管理" l
        JOIN "利用者" u ON l."利用者id" = u."利用者id"
        JOIN "書籍" b ON l."書籍id" = b."書籍id";
            `;

    const res = await client.query(query);

    // 「返却済み」を「はい / いいえ」に変換
    const formattedRows = res.rows.map(row => ({
      ...row,
      返却済み: row.返却済み === true ? "はい" : "いいえ",
    }));

    console.log("📚 貸出データ一覧:", formattedRows);

    await client.end();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(formattedRows),
    };
  } catch (error) {
    console.error("❌ DB接続エラー:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

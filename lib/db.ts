import mysql from "mysql2/promise";

export interface Student {
  id: number;
  usn: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  course: string;
  section: string;
  password: string | null;
  has_voted: number;
  created_at: Date;
}

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "aclc_vote",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: (string | number | boolean | null)[]): Promise<T> {
  const db = getDbPool();
  const [rows] = await db.execute(sql, params);
  return rows as T;
}

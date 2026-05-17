import { NextResponse } from "next/server";
import { query, type Student } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { usn, password } = await request.json();

    if (!usn || !password) {
      return NextResponse.json(
        { error: "Please enter both USN and password." },
        { status: 400 }
      );
    }

    // Query XAMPP MySQL database
    const students = await query<Student[]>(
      "SELECT * FROM students WHERE usn = ? LIMIT 1",
      [usn]
    );

    if (students.length === 0) {
      return NextResponse.json(
        { error: "USN not found. Please register or verify your entry." },
        { status: 404 }
      );
    }

    const student = students[0];

    // Check if the student has set a password yet
    if (!student.password) {
      return NextResponse.json(
        { error: "This USN is not registered yet. Please go to the Register tab to create your password first." },
        { status: 403 }
      );
    }

    // Password validation (using plain text for simplicity and ease of custom XAMPP prototyping)
    if (student.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const fullName = [student.first_name, student.middle_name, student.last_name]
      .filter(Boolean)
      .join(" ");

    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        usn: student.usn,
        fullName,
        hasVoted: Boolean(student.has_voted),
      },
    });
  } catch (err: unknown) {
    console.error("Database error during sign in:", err);
    return NextResponse.json(
      { error: "Database connection failed. Please make sure your XAMPP MySQL server is running." },
      { status: 500 }
    );
  }
}

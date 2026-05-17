import { NextResponse } from "next/server";
import { query, type Student } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { studentId: usn, password } = await request.json();

    if (!usn) {
      return NextResponse.json(
        { error: "Please enter a USN." },
        { status: 400 }
      );
    }

    // Query XAMPP MySQL database to see if student exists
    const students = await query<Student[]>(
      "SELECT * FROM students WHERE usn = ? LIMIT 1",
      [usn]
    );

    if (students.length === 0) {
      return NextResponse.json(
        { error: "Student USN not found in student directory." },
        { status: 404 }
      );
    }

    const student = students[0];

    // If password is provided, this is the actual Registration step!
    if (password) {
      if (student.password) {
        return NextResponse.json(
          { error: "This student is already registered! Please sign in." },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      // Update student password in XAMPP MySQL
      await query(
        "UPDATE students SET password = ? WHERE usn = ?",
        [password, usn]
      );

      return NextResponse.json({
        success: true,
        message: "Registration successful! You can now sign in with your password.",
      });
    }

    // Otherwise, this is the Search Student step!
    if (student.password) {
      return NextResponse.json(
        { error: "This USN is already registered! Please sign in." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Welcome, ${student.first_name} ${student.last_name}! Record verified. Please set your password below.`,
      student: {
        usn: student.usn,
        firstName: student.first_name,
        lastName: student.last_name,
        middleName: student.middle_name || "",
        course: student.course,
        section: student.section,
      },
    });
  } catch (err: unknown) {
    console.error("Database error during verification:", err);
    return NextResponse.json(
      { error: "Database connection failed. Please ensure XAMPP MySQL is running." },
      { status: 500 }
    );
  }
}

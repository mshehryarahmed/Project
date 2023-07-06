import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.config';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  newStudent: any = {};
  updateMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.http.get<any[]>(`${API_BASE_URL}/api/students`).subscribe(students => {
      this.students = students;
    });
  }

  createStudent(): void {
    this.http.post(`${API_BASE_URL}/api/students`, this.newStudent).subscribe(() => {
      this.resetForm();
      this.fetchStudents();
    });
  }

  updateStudent(student: any): void {
    this.http.put(`${API_BASE_URL}/api/students/${student._id}`, student).subscribe(() => {
      this.resetForm();
      this.fetchStudents();
    });
  }

  deleteStudent(student: any): void {
    this.http.delete(`${API_BASE_URL}/api/students/${student._id}`).subscribe(() => {
      this.fetchStudents();
    });
  }

  editStudent(student: any): void {
    this.newStudent = { ...student };
    this.updateMode = true;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.newStudent = {};
    this.updateMode = false;
  }
}

import app from '../../src/app';
import {PostStudent, PutStudent} from '../../src/interfaces/Student';
import {closePool} from '../../src/utils/db';
import {
  getNotFound,
  getSingleStudentError,
  postStudentFileError,
  postStudentNameError,
} from './errorTests';
import {
  getSingleStudent,
  postStudent,
  putStudent,
  deleteStudent,
  getStudents,
} from './studentTests';

import randomstring from 'randomstring';

describe('GET /api/v1', () => {
  afterAll(async () => {
    // close database connection
    await closePool();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  // test create student
  const student: PostStudent = {
    student_name: 'Test Student ' + randomstring.generate(7),
    birthdate: '1955-10-11',
    filename: 'cat.jpg',
  };

  let testUserID: number;

  // test create student
  it('should create a new student', async () => {
    const result = await postStudent(app, student);
    if (result.id) {
      testUserID = result.id;
    }
  });

  // test create student file error
  it('should return error for student not added', async () => {
    await postStudentFileError(app, student);
  });

  // test create student validation error, no name
  it('should return error for student not added', async () => {
    await postStudentNameError(app, student);
  });

  // test get all students
  it('should return array of students', async () => {
    await getStudents(app);
  });

  // test get single student
  it('should return single user', async () => {
    await getSingleStudent(app, testUserID);
  });

  // test get single student error
  it('should return error for student not found', async () => {
    await getSingleStudentError(app, 999999);
  });

  // test update student
  it('should update user', async () => {
    const newStudent: PutStudent = {
      student_name: 'Updated Student ' + randomstring.generate(7),
      birthdate: '1995-10-11',
    };
    await putStudent(app, newStudent, testUserID);
  });

  // test delete student
  it('should delete user', async () => {
    await deleteStudent(app, testUserID);
  });
});

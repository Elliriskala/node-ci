/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {PostStudent, PutStudent, Student} from '../../src/interfaces/Student';
import MessageResponse from '../../src/interfaces/MessageResponse';

const getStudents = (url: string | Function): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/students')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const cats: Student[] = response.body;
          cats.forEach((student) => {
            expect(student).toHaveProperty('student_id');
            expect(student).toHaveProperty('student_name');
            expect(student).toHaveProperty('birthdate');
          });
          resolve(cats);
        }
      });
  });
};

const getSingleStudent = (
  url: string | Function,
  id: number
): Promise<Student> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/students/' + id)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const student = response.body;
          expect(student).toHaveProperty('student_id');
          expect(student).toHaveProperty('student_name');
          expect(student).toHaveProperty('birthdate');
          resolve(response.body);
        }
      });
  });
};

const postStudent = (
  url: string | Function,
  student: PostStudent
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/students/')
      .set('Content-type', 'form-data')
      .attach('image', 'test/' + student.filename)
      .field('student_name', student.student_name)
      .field('birthdate', student.birthdate)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result.id).not.toBe('');
          expect(result.message).toBe('student added');
          resolve(result);
        }
      });
  });
};

// user modify student
const putStudent = (
  url: string | Function,
  student: PutStudent,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put('/api/v1/students/' + id)
      .set('Content-type', 'application/json')
      .send({
        student_name: student.student_name,
        birthdate: student.birthdate,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result.message).toBe('student updated');
          resolve(result);
        }
      });
  });
};

//  delete student
const deleteStudent = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete('/api/v1/students/' + id)
      .set('Content-type', 'application/json')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result.message).toBe('student deleted');
          expect(result.id).toBe(id);
          resolve(result);
        }
      });
  });
};

export {getStudents, getSingleStudent, postStudent, putStudent, deleteStudent};

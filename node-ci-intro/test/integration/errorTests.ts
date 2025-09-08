// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import MessageResponse from '../../src/interfaces/MessageResponse';
import {PostStudent} from '../../src/interfaces/Student';

// test error for some random url, should return 404
const getNotFound = (url: string | Function) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/what-is-this')
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

// should generate error for student not found, should return 404
const getSingleStudentError = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/students/' + id)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result.message).toBe('No students found');
          resolve(response.body);
        }
      });
  });
};

// should generate 400 error for student not added because of missing file
// message should be 'file not valid'
const postStudentFileError = (
  url: string | Function,
  student: PostStudent
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/students/')
      .set('Content-type', 'form-data')
      .field('student_name', student.student_name)
      .field('birthdate', student.birthdate)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result.message).toBe('file not valid');
          resolve(result);
        }
      });
  });
};

// should generate 400 error for student not added because of missing student_name
// message should be 'student_name is required'
const postStudentNameError = (
  url: string | Function,
  student: PostStudent
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/students/')
      .set('Content-type', 'form-data')
      .attach('image', 'test/' + student.filename)
      .field('birthdate', student.birthdate)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result.message).toBe('Invalid value: student_name');
          resolve(result);
        }
      });
  });
};

export {
  getNotFound,
  getSingleStudentError,
  postStudentFileError,
  postStudentNameError,
};

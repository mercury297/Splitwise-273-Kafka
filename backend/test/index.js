/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

// const apiHost = 'http://localhost';
// const apiPort = '3001';
// const apiURL = `${apiHost}:${apiPort}`;

describe('Ping server', () => {
  it('It should get response from server', (done) => {
    chai.request(server)
      .get('/user/pingServer')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
  });
});

describe('Test Login', () => {
  it('It should get user data', (done) => {
    chai.request(server)
      .post('/user/login')
      .send({ email: 'user1@user1.com', password: 'pass123' })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('email').eq('user1@user1.com');
        done();
      });
  });
});

describe('Test register', () => {
  it('It should create user data', (done) => {
    chai.request(server)
      .post('/user/register')
      .send({ email: 'chinmay1@gmail.com', password: 'chinmay123', name: 'Chinmay' })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('email').eq('chinmay1@gmail.com');
        done();
      });
  });
});

describe('Update user profile', () => {
  it('It should update user data', (done) => {
    chai.request(server)
      .put(`/profile/${chinmay1gmail.com}/update`)
      .send({ updates: { name: 'Yash Gupte' } })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
  });
});

describe('Login on wrong credentials', () => {
  it('It should give user not found error', (done) => {
    chai.request(server)
      .post('/user/login')
      .send({ email: 'yash', password: 'yash123' })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('body').eq('User not found');
        done();
      });
  });
});

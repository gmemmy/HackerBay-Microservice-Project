import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../index';
import AuthenticationController from '../../controllers/AuthenticationController';

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration tests for the user controller', () => {
  describe('Test general error handling and welcome message', () => {
    // it('should send an error when there is an unforeseen error', async () => {
    //   const userDetails = {
    //     username: 'Thomas?',
    //     password: 'tomnjerry',
    //   };
    //   const response = await chai.request(app).post('/api/v1/auth/login/')
    //     .send(userDetails);
    //   expect(response.status).to.deep.equal(500);
    //   expect(response.body).to.have.property('success');
    //   expect(response.body.success).to.equal(false);
    //   expect(response.error).to.have.property('message');
    //   expect(response.body.message).to.equal('An error occurred, please try again');
    // });
    it('should send an error when invalid URL is given', async () => {
      const response = await chai.request(app).get('/api/v1/some/funny/url');
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.equal('The page you are looking for does not exist');
    });
  });
  describe('Test login a user', () => {
    it('should log a user in when valid details are given', async () => {
      const response = await chai.request(app).post('/api/v1/auth/login')
        .send({
          username: 'gmemmy',
          password: 'password'
        });
      expect(response.status).to.deep.equal(200);
      expect(response.body.data).to.have.property('message');
      expect(response.body.data.message).to.equal('Login successful!');
      expect(response.body.data).to.have.property('success');
      expect(response.body.data.success).to.equal(true);
      expect(response.body.data.user).to.be.an('object');
    });
    it('should return client error when user details is missing', async () => {
      const response = await chai.request(app).post('/api/v1/auth/login')
        .send({
          username: 'gmemmy'
        });
      expect(response.status).to.deep.equal(400);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.equal('Invalid request. \'password\' field is required');
    });
  });
  // before('Get user token', async () => {
  //   const loginResponse = await chai.request(app).post('/api/v1/auth/login')
  //     .send({
  //       email: 'demo2@demo.com',
  //       password: 'password',
  //     });
  //   const {
  //     token,
  //     id
  //   } = loginResponse.body.data.userDetails;
  // });
});

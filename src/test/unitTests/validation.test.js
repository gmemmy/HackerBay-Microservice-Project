import chai from 'chai';
import app from '../../index';
import { checkForEmptyFields, trimValues, allFieldsRequired } from '../../validation';

const { expect } = chai;
const req = {
  username: 'gmemmy'
};
const res = {
  status() { return this; },
  json(obj) { return obj; }
};

describe('Unit tests for the Validation methods', () => {
  it('should check for empty fields in the request body', () => {
    const response = checkForEmptyFields(req);
    expect(response).to.be.equals(undefined);
  });
  it('should require all fields', () => {
    const response = allFieldsRequired(res, 'name');
    expect(response).to.have.property('success');
    expect(response.success).to.equal(false);
    expect(response).to.have.property('message');
    expect(response.message).to.equal('Invalid request! \'name\' field is required');
  });
  it('should trim the request body', () => {
    const response = trimValues(req);
    expect(response).to.be.an('object');
  });
  it('should use all the validation methods', () => {
    req.body = trimValues(req);
    const emptyField = checkForEmptyFields(req.body);
    const response = allFieldsRequired(res, emptyField);
    expect(response).to.be.an('object');
    expect(response).to.have.property('success');
    expect(response.success).to.equal(false);
    expect(response).to.have.property('message');
    expect(response.message).to.equal('Invalid request! \'body\' field is required');
  });
});

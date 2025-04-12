import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import userController from '.';
import userService from '../service';
import { userPayloadMock, userPayloadMockCreate } from '../mock';

describe('UserController', () => {
  let createUserStub: sinon.SinonStub;
  let findByFilterStub: sinon.SinonStub;

  beforeEach(() => {
    createUserStub = sinon.stub(userService, 'create').resolves();
    findByFilterStub = sinon.stub(userService, 'findByFilter');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call userService.create with correct data if user does not exist', async () => {
    findByFilterStub.resolves([]);

    const req = {
      body: userPayloadMockCreate,
    } as Request;

    const res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await userController.create(req, res);

    expect(createUserStub.calledOnce).to.be.true;
    expect(createUserStub.calledWith(userPayloadMockCreate)).to.be.true;
  });

  it('should throw BadRequestError if user already exists', async () => {
    findByFilterStub.resolves([userPayloadMockCreate]);

    const req = {
      body: userPayloadMockCreate,
    } as Request;

    const res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      await userController.create(req, res);
      expect.fail('Expected ConflictError to be thrown');
    } catch (error) {
      expect(error.statusCode).to.equal(409);
    }

    expect(findByFilterStub.calledOnceWithExactly(userPayloadMockCreate.email, 'email')).to.be.true;
  });
});
/*import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import userController from '.';
import userService from '../service';
import { IUser } from '@/types/user';

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
    const userPayload: Partial<IUser> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [40.7128, 74.0060],
    };

    findByFilterStub.resolves([]);

    const req = {
      body: { user: userPayload },
    } as Request;

    const res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await userController.create(req, res);

    expect(createUserStub.calledOnce).to.be.true;
    expect(createUserStub.calledWith(userPayload)).to.be.true;
  });

  it('should throw BadRequestError if user already exists', async () => {
    const userPayload: Partial<IUser> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [40.7128, 74.0060],
    };

    findByFilterStub.resolves([userPayload]);

    const req = {
      body: { user: userPayload },
    } as Request;

    const res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      await userController.create(req, res);
      expect.fail('Expected BadRequestError to be thrown');
    } catch (error) {
      expect(error.statusCode).to.equal(400);
    }

    expect(findByFilterStub.calledOnceWithExactly(userPayload.email, 'email')).to.be.true;
  });
});*/
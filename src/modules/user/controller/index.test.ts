import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import userController from '.';
import userService from '../service';
import { userPayloadMock, userPayloadMockCreate } from '../mock';

describe('UserController create method', () => {
  let createUserStub: sinon.SinonStub;
  let findByFilterStub: sinon.SinonStub;


  beforeEach(() => {
    createUserStub = sinon.stub(userService, 'create').resolves(userPayloadMockCreate);
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

    const result = await userController.create(req, res);

    expect(createUserStub.calledOnce).to.be.true;
    expect(createUserStub.calledWith(userPayloadMockCreate)).to.be.true;
    expect(result).to.deep.equal(userPayloadMockCreate);
  });

  it('should throw ConflictError if user already exists', async () => {
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

  it('should throw Error when user send coordinate and address', async () => {
    findByFilterStub.resolves([]);

    const req = {
      body: userPayloadMock,
    } as Request;

    const res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    try {
      await userController.create(req, res);
      expect.fail('Expected ConflictError to be thrown');
    } catch (error) {
      expect(error.statusCode).to.equal(400);
    }

    expect(findByFilterStub.calledOnceWithExactly(userPayloadMock.email, 'email')).to.be.false;
  });

});

describe('UserController getAll method', () => {
  let getAllStub: sinon.SinonStub;

  beforeEach(() => {
    getAllStub = sinon.stub(userService, 'getAll');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call userService.getAll to list all customers', async () => {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    getAllStub.resolves([userPayloadMock])
    const result = await userController.getAll(req, res);

    expect(getAllStub.calledOnce).to.be.true;
    expect(result).to.deep.equal([userPayloadMock])
  });
});

describe('UserController getById method', () => {
  let getAllStub: sinon.SinonStub;
  let getByIdStub: sinon.SinonStub;
  let deleteStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;

  beforeEach(() => {
    getAllStub = sinon.stub(userService, 'getAll');
    getByIdStub = sinon.stub(userService, 'getById');
    deleteStub = sinon.stub(userService, 'delete');
    updateStub = sinon.stub(userService, 'update');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call userService.getById to list unique customer', async () => {
    const req = {
      params: {
        id: 1,
      }
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    getByIdStub.resolves(userPayloadMock);

    const result = await userController.getById(req, res);

    expect(getByIdStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(userPayloadMock)
  });

  it('should throw error userService.getById when customer id is undefined', async () => {
    const req = {
      params: {}
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    getByIdStub.resolves();

    try {
      await userController.getById(req, res);
    } catch (error) {
      expect(error.statusCode).to.equal(400);
    }
    

    expect(getByIdStub.calledOnce).to.be.false;
  });

});

describe('UserController delete method', () => {
  let deleteStub: sinon.SinonStub;

  beforeEach(() => {
    deleteStub = sinon.stub(userService, 'delete');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call userService.delete to delete unique customer', async () => {
    const req = {
      params: {
        id: 1,
      }
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    deleteStub.resolves(userPayloadMock);

    const result = await userController.delete(req, res);

    expect(deleteStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(userPayloadMock)
  });

  it('should throw error userService.delete when customer id is not valid value', async () => {
    const req = {
      params: {
        id: 123
      },
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    deleteStub.resolves();

    try {
      await userController.update(req, res);
    } catch (error) {
      expect(error.statusCode).to.equal(400);
    }
    
    expect(deleteStub.calledOnce).to.be.false;
  });
});

describe('UserController update method', () => {
  let updateStub: sinon.SinonStub;

  beforeEach(() => {
    updateStub = sinon.stub(userService, 'update');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw error userService.update when customer id and body is undefined', async () => {
    const req = {
      params: {}
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    updateStub.resolves();

    try {
      await userController.update(req, res);
    } catch (error) {
      expect(error.statusCode).to.equal(400);
    }
    
    expect(updateStub.calledOnce).to.be.false;
  });

  it('should throw error userService.update when customer id is not valid value', async () => {
    const req = {
      params: {
        id: 123
      },
      body: {
        email: userPayloadMock.email
      }
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    updateStub.resolves();

    try {
      await userController.update(req, res);
    } catch (error) {
      expect(error.statusCode).to.equal(400);
    }
    
    expect(updateStub.calledOnce).to.be.false;
  });

  it('should userService.update update customer', async () => {
    const req = {
      params: {
        id: '661c6d6630b64e3a5e54f9a9'
      },
      body: {
        email: userPayloadMock.email
      }
    } as unknown as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    updateStub.resolves(userPayloadMock);

    const result = await userController.update(req, res);
    expect(updateStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(userPayloadMock);
  });
});
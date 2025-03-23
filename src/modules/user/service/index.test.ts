import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import sinon from 'sinon';
import userService from './index';
import { CreateUserUseCase } from '../useCases/createUserUseCase';
import { IUser } from '@/types/user';

describe('UserService', () => {
  let mongoServer: MongoMemoryServer;
  let createUserUseCaseStub: sinon.SinonStub;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    const createUserUseCaseInstance = new CreateUserUseCase();
    createUserUseCaseStub = sinon.stub(createUserUseCaseInstance, 'execute').resolves({} as IUser);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a user', async () => {
    const user: Partial<IUser> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [123.45, 678.90],
    };

    const result = await userService.create(user);
    expect(result).to.be.an('object');
  });

  it('should throw error if CreateUserUseCase fails', async () => {
    createUserUseCaseStub.rejects(new Error('Something went wrong'));

    const user: IUser = {
      _id: 'some-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      coordinates: [123.45, 678.90],
    };

    try {
      await userService.create(user);
    } catch (error) {
      expect(error.message).to.equal('Something went wrong');
    }
  });
});
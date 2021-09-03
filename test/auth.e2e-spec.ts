import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import * as request from 'supertest';
import { provideConnection, TestUtils } from './utils';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        AppModule,
      ],
      providers: [
        {
          provide: 'Connection',
          useFactory: provideConnection,
          inject: [ConfigService],
        },
        TestUtils,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    testUtils = moduleFixture.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Signup (e2e)', () => {
    it('/auth/signup (POST): Can register new account', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          type: 'USER',
          username: 'user7',
          email: 'user7@gmail.com',
          password: 'password',
          firstName: 'user7',
          lastName: 'user7',
        });
      expect(response.status).toBe(201);
      expect(response.body.username).toBeDefined();
      expect(response.body.password).toBeUndefined();
    });

    it('/auth/signup (POST): Cannot register new account with same email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          type: 'USER',
          username: 'user7',
          email: 'user7@gmail.com',
          password: 'password',
          firstName: 'user7',
          lastName: 'user7',
        });
      expect(response.status).toBe(500);
    });

    it('/auth/signup (POST): Remove password from response', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          type: 'USER',
          username: 'user5',
          email: 'user5@gmail.com',
          password: 'password',
          firstName: 'user5',
          lastName: 'user5',
        });
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.password).toBeUndefined();
    });
  });
});

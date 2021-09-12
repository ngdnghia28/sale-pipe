import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import { AppModule } from 'src/app.module';
import { SignupTokenService } from 'src/auth/signup-token.service';
import configuration from 'src/config/configuration';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { users } from './fixtures/entity/users';
import { provideConnection, TestUtils } from './utils';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let signupTokenService: SignupTokenService;
  let userService: UsersService;
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
    signupTokenService = app.get(SignupTokenService);
    await testUtils.reloadFixtures();
    userService = app.get(UsersService);
    await Promise.all(
      users.map((u: any) => {
        return userService.create(u);
      }),
    );
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
          type: 'SDR',
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
          type: 'SDR',
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
          type: 'SDR',
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

    describe('Confirm account', () => {
      it('/auth/signup/confirm (POST): Can confirm account with correct code', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user8',
            email: 'user8@gmail.com',
            password: 'password',
            firstName: 'user8',
            lastName: 'user8',
          });
        expect(response.status).toBe(201);

        const token = await signupTokenService.findByUserId(response.body.id);
        expect(token.code).toBeDefined();
        expect(token.userId).toBe(response.body.id);
        expect(token.expiryDate.getTime()).toBeLessThanOrEqual(
          moment().add(25, 'hours').toDate().getTime(),
        );
        expect(token.expiryDate.getTime()).toBeGreaterThanOrEqual(
          moment().add(23, 'hours').toDate().getTime(),
        );

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/confirm')
          .send({
            code: token.code,
          });

        expect(confirmResponse.status).toBe(201);
      });

      it('/auth/signup/confirm (POST): Can not confirm account with wrong code', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user9',
            email: 'user9@gmail.com',
            password: 'password',
            firstName: 'user9',
            lastName: 'user9',
          });
        expect(response.status).toBe(201);

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/confirm')
          .send({
            code: '79ac6757-3779-4762-a54d-b6fa4131f1a2',
          });

        expect(confirmResponse.status).toBe(404);
      });

      it('/auth/signup/confirm (POST): Can not confirm account with expire token', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user10',
            email: 'user10@gmail.com',
            password: 'password',
            firstName: 'user10',
            lastName: 'user10',
          });
        expect(response.status).toBe(201);

        const token = await signupTokenService.findByUserId(response.body.id);
        await signupTokenService.updateByUserId(response.body.id, {
          expiryDate: new Date(),
        });

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/confirm')
          .send({
            code: token.code,
          });

        expect(confirmResponse.status).toBe(400);
      }, 10000);
    });
  });
});

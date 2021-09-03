import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import * as request from 'supertest';
import { provideConnection, TestUtils } from './utils';

describe('User-profiles (e2e)', () => {
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

  describe('Permission (e2e)', () => {
    describe('Unauthentication (e2e)', () => {
      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/user-profiles',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/user-profiles/123',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer()).post(
          '/user-profiles',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer()).patch(
          '/user-profiles/123',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer()).delete(
          '/user-profiles/123',
        );

        expect(response.status).toBe(401);
      });
    });

    describe('USER role (e2e)', () => {
      let userToken: string;
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'user@gmail.com',
            password: 'password',
          });

        userToken = response.body.access_token;

        expect(userToken).toBeDefined();
      });

      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/user-profiles')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/user-profiles/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/user-profiles/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });
    });

    describe('HIRER role (e2e)', () => {
      let hirerToken: string;
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'hirer@gmail.com',
            password: 'password',
          });

        hirerToken = response.body.access_token;

        expect(hirerToken).toBeDefined();
      });

      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/user-profiles')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/user-profiles/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/user-profiles/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });
    });

    describe('ADMIN role (e2e)', () => {
      let adminToken: string;
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'admin@gmail.com',
            password: 'password',
          });

        adminToken = response.body.access_token;

        expect(adminToken).toBeDefined();
      });

      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/user-profiles')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/user-profiles/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/user-profiles/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });
    });
  });

  describe('Bussiness (e2e)', () => {
    let hirerToken: string;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'hirer@gmail.com',
          password: 'password',
        });

      hirerToken = response.body.access_token;

      expect(hirerToken).toBeDefined();
    });

    it('/user-profiles (GET): Only get verified profiles', async () => {
      let response = await request(app.getHttpServer())
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

      const {
        body: { access_token },
      } = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'user5@gmail.com',
        password: 'password',
      });
      expect(access_token).toBeDefined();

      response = await request(app.getHttpServer())
        .post('/user-profiles/my')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          phone: '+84912333444',
          email: 'email@gmail.com',
          rate: '20',
          hours_per_week: 20,
          avatar: 'http://avatar.com/img.jpg',
          headline: 'headline',
          bio: 'bio',
          countryId: 'dba7019a-29b7-45ff-a659-1e10615e13ff',
          languages: [
            {
              id: '253c634a-59ae-451f-9dac-d2362ccf6b24',
            },
          ],
          yose: 3,
          industries: [
            {
              id: '0ca30200-b277-4912-a3f4-cf1e9e71764c',
            },
          ],
        });
      expect(response.status).toBe(201);

      response = await request(app.getHttpServer())
        .get('/user-profiles')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(200);
      const profiles = response.body;
      expect(profiles).toStrictEqual([]);
    });
  });
});

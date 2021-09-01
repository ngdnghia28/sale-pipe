import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { Country } from 'src/countries/entities/country.entity';
import * as request from 'supertest';

describe('Countries (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('/countries (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/countries')

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);

    const country: Country = response.body[0];
    expect(country.id).toBeDefined();
    expect(country.name).toBeDefined();
    expect(country.code).toBeDefined();
  });
});

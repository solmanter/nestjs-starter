import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SetupTest } from './e2e.setup';
import supertest from 'supertest';

describe('Users Controller (e2e)', () => {
  let app: NestFastifyApplication;
  let request: supertest.Agent;

  beforeAll(async () => {
    app = await SetupTest();
    request = supertest(app.getHttpServer());
  });

  afterAll(() => app.close());

  describe('Authorization', () => {
    it(`Get users with unauthorized`, async () => {
      const result = await request.get('/users');
      expect(result.body).toHaveProperty('message');
      expect(result.body.statusCode).toEqual(401);
      expect(result.body.message).toEqual('Unauthorized');
    });
  });
});
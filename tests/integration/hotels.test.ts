import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import { TicketStatus } from '@prisma/client';
import { cleanDb, generateValidToken } from '../helpers';
import { createEnrollmentWithAddress, createPayment, createTicket, createTicketRemote, createUser } from '../factories';
import app, { init } from '@/app';

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('GET hotels/', () => {
  it('should respond status 401 if no token exists', async () => {
    const { status } = await server.get('/hotels');
    expect(status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 402 when the ticket is remote', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketRemote();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);

    const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
  });
  it('should respond with status 404 when user is not allowed', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createTicketRemote();

    const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(status).toBe(httpStatus.NOT_FOUND);
  });
});

describe('GET hotels/:id', () => {
  it('shuold respond status 402 when the ticket is remote', async () => {
    const { status } = await server.get('/hotels/1');
    expect(status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('should respond status 404 for invalid hotel ID', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign(
      {
        userId: userWithoutSession.id,
      },
      process.env.JWT_SECRET,
    );
    const { status } = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
    expect(status).toBe(httpStatus.UNAUTHORIZED);
  });
});

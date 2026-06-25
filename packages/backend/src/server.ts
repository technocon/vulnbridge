import Fastify from 'fastify';
import cors from '@fastify/cors';
import { Finding } from '@vulnbridge/shared';

const fastify = Fastify({
  logger: true,
});

fastify.register(cors);

fastify.get('/health', async (_request, _reply) => {
  return { status: 'ok' };
});

fastify.get('/findings', async (_request, _reply) => {
  const findings: Finding[] = [
    { id: '1', source: 'Snyk', cve: 'CVE-2021-1234', severity: 'High' },
  ];
  return findings;
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

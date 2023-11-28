import dockerCompose from 'docker-compose';

export default async function () {
  console.log('\nStopping docker compose... ⏳');

  await dockerCompose.down();

  console.log('\nDocker compose stopped. ✅');
}

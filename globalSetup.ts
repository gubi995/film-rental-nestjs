import dockerCompose from 'docker-compose';

export default async function () {
  console.log('\nStarting docker compose... ⏳');

  await dockerCompose.upOne('test-database');

  console.log('\nDocker compose stared. ✅');
}

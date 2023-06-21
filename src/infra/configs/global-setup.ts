import { config as loadEnvConfig } from 'dotenv';

export default async () => {
  const env = process.argv[2] || 'production';
  loadEnvConfig({ path: `./envs/.env.${env}` });
  console.log('Env: '); // add this line
  console.log(process.env); // add this line

};





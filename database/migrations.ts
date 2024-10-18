import { exec } from 'child_process';

const runCommand = (command: string) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
      return;
    }
    console.log(`✅ Output: ${stdout}`);
  });
};

export const migrateUp = () => runCommand('npx prisma migrate deploy');
export const migrateDown = () => runCommand('npx prisma migrate reset --force');
export const migrateRefresh = () => {
  runCommand('npx prisma migrate reset --force');
  console.log('✅ Database refreshed.');
};

const action = process.argv[2];

switch (action) {
  case 'up':
    migrateUp();
    break;
  case 'down':
    migrateDown();
    break;
  case 'refresh':
    migrateRefresh();
    break;
  default:
    console.log('❌ Unknown command. Use "up", "down", or "refresh".');
}


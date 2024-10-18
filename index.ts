import Elysia from 'elysia';
import { initModules, loadConfig } from './src/config/config';

const app = new Elysia();

(async () => {
  // รอ initModules ให้เสร็จก่อน
  await initModules(app);

  // โหลดค่าการตั้งค่าหลังจาก initModules เรียบร้อยแล้ว
  const config = loadConfig();
  const port = config.port || 9090; // กำหนดค่า port จาก config
  const host = config.host || 'http://127.0.0.1'; // กำหนดค่า host จาก config

  app.listen(port, () => {
    console.log(`🚀 Server running at ${host}:${port}`);
  });
})();

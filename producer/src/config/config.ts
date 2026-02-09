import { parseEnvInt } from 'src/helper/env.helper';

export const config = () => ({
  port: parseEnvInt(process.env.PORT, 3000),
});

export type AppConfig = ReturnType<typeof config>;

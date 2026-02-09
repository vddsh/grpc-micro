export const parseEnvInt = (
  envVar: string | undefined,
  fallback: number,
): number => {
  if (!envVar) return fallback;
  const parsed = parseInt(envVar, 10);
  return isNaN(parsed) ? fallback : parsed;
};

export const parseEnvStr = <T extends string>(
  envVar: T | undefined,
  fallback: T,
): T => {
  if (!envVar || envVar.length === 0) return fallback;
  return envVar;
};

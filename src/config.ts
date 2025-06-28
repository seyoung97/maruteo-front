const PREFIX = 'VITE_';

const getConfig = (name: string, defaultValue?: string) => {
  const configName = `${PREFIX}${name}`;
  const value = import.meta.env[configName as keyof ImportMetaEnv];

  if (value !== undefined) {
    return value;
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw new Error('잘못된 CONFIG 입니다', {
      cause: `NOT FOUND ${name} CONFIG`,
    });
  }
};

export default {
  ENV: getConfig('ENV', 'development'),
  API_URL: getConfig('API_URL', 'http://localhost:5000'),
  GOOGLE_CLIENT_ID: getConfig('GOOGLE_CLIENT_ID'),
  GOOGLE_API_KEY: getConfig('GOOGLE_API_KEY'),
};

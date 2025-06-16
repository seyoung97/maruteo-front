const PREFIX = 'VITE_';

const getConfig = (name: string) => {
  const configName = `${PREFIX}${name}`;
  const value = import.meta.env[configName as keyof ImportMetaEnv];

  if (value !== undefined) {
    return value;
  } else {
    throw new Error('잘못된 CONFIG 입니다', {
      cause: `NOT FOUND ${name} CONFIG`,
    });
  }
};

export default {
  ENV: getConfig('ENV'),
  API_URL: getConfig('API_URL'),
};

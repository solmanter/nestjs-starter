declare interface EnvType {
  DATABASE_URL: string;
  APP_PORT: number;
  DOCS_PORT: number;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvType {}
}

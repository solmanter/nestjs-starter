declare type TResponse<T> = import('@ts-rest/core').ServerInferResponses<T>;
declare type TRequest<T> = import('@ts-rest/core').ServerInferRequest<T>;

declare interface UserPayload {
  userId: string;
};

declare type SocketPayload = import('socket.io').Socket & { user: UserPayload };

declare type GetDataColumn<T extends Record<string, Column>> = {
  [K in keyof T]: import('drizzle-orm').GetColumnData<T[K]>;
};

declare type ISchema = typeof import('@libs/schema');
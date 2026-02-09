export const config = () => ({
  userProducerGrpcURL: process.env.USERS_PRODUCER_GRPC_URL,
});

export type AppConfig = ReturnType<typeof config>;

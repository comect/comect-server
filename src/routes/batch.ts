import { FastifyServer } from "../interface/server";

export const batch = (server: FastifyServer) => {
  server.post(
    "/addBatch",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              id: {
                type: "string",
              },
            },
          },
        },
      },
    },
    (request: any, reply: any) => {
      reply.code(201).send({ message: "OK", id: null });
    }
  );

  server.get(
    "/getAllBatches",
    {
      schema: {
        response: {
          200: {
            type: "array",
          },
        },
      },
    },
    (request: any, reply: any) => {
      return reply.code(200).send([]);
      // reply.code(400).send({ message: "not yet" });
    }
  );
};

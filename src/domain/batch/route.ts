import { FastifyServer } from "../../interface/server";

export default function routes(server: FastifyServer) {
  /**
   *
   * getBatch
   *
   * Get a specific batch by id
   * @param id - batch id
   **/
  server.get<{ Querystring: { id: string } }>(
    "/batch",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        // response: {
        //   200: {
        //     type: "object",
        //     properties: {
        //       id: "string",
        //     },
        //   },
        // },
      },
    },
    async (request, reply) => {
      try {
        // const batch = await server.batchManager.findById(request.query.id);
        // if (batch) {
        if (request.query.id) {
          return reply.code(200).send({ id: request.query.id });
        } else {
          return reply.code(404).send();
        }
      } catch (e) {
        server.log.error("Error while getting batch", e);
        return reply.code(500).send({});
      }
    }
  );
  /**
   *
   * addBatch
   *
   * When a grower adds a batch of grain to the blockchain.
   * This will create the grain asset on the blockchain.
   * @param size - size of grain (small, medium, large)
   * @param variety - variety of the grains
   * @param batchState - the state of the grain
   *  (READY_FOR_DISTRIBUTION, READY_FOR_BREWING, READY_FOR_SALE, SOLD?)
   * @param growerId - the Id of the grower who will be associated with this batch
   * @param location - the geolocation coordinates of where the batch was added
   **/
  server.post(
    "/batch",
    {
      // schema: {
      //   response: {
      //     200: {
      //       type: "object",
      //       properties: {
      //         status: {
      //           type: "boolean",
      //         },
      //         id: {
      //           type: "string",
      //         },
      //       },
      //     },
      //   },
      // },
    },
    (request: any, reply: any) => {
      reply.code(201).send({ status: true, id: "1" });
    }
  );
}

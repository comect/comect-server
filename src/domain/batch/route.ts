import { FastifyServer } from "../../interface/server";
import { Batch, BatchModel } from "./model";

export default function routes(server: FastifyServer) {
  /**
   *
   * Get a Batch
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
      },
    },
    async (request, reply) => {
      try {
        // const batch = await server.batchManager.findById(request.query.id);
        const batch = await BatchModel.findById(request.query.id);
        if (batch) {
          return reply.code(200).send(batch);
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
   * Add a Batch
   *
   * When a grower adds a batch of grain,
   * this will create a Batch asset.
   * @param growerId - the Id of the grower who will be associated with this batch
   * @param location - the geolocation coordinates of where the batch was added
   * Optional params:
   * @param size - size of grain (small, medium, large)
   * @param variety - variety of the grains
   * @param batchState - the state of the grain
   *  (READY_FOR_DISTRIBUTION, READY_FOR_BREWING, READY_FOR_SALE, SOLD?)
   **/
  server.post("/batch", {}, async (request, reply) => {
    let batch = request.body as Batch;
    batch = await BatchModel.create(batch);
    reply.code(201).send({ success: true, result: batch });
  });
}

import { FastifyServer } from "../../interface/server";
import { Serving, ServingModel } from "./model";

export default function routes(server: FastifyServer) {
  /**
   *
   * Get a specific serving by id
   *
   * @param id - serving id
   **/
  server.get<{ Querystring: { id: string } }>(
    "/serving",
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
        // const serving = await server.servingManager.findById(request.query.id);
        const serving = await ServingModel.findById(request.query.id);
        if (serving) {
          return reply.code(200).send(serving);
        } else {
          return reply.code(404).send();
        }
      } catch (e) {
        server.log.error("Error while getting serving", e);
        return reply.code(500).send({});
      }
    }
  );
  /**
   *
   * Add a Serving
   *
   * @param brew - the id of the brew that is served
   * @param consumerId - the id of the consumer who had this serving
   * @param location - the geolocation coordinates of where the serving was added
   **/
  server.post("/serving", {}, async (request, reply) => {
    let serving = request.body as Serving;
    serving = await ServingModel.create(serving);
    reply.code(201).send({ success: true, result: serving });
  });
}

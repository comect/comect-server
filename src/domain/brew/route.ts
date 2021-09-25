import { FastifyServer } from "../../interface/server";
import { Brew, BrewModel } from "./model";

export default function routes(server: FastifyServer) {
  /**
   *
   * Get a Brew
   *
   * Get a specific brew by id
   * @param id - brew id
   **/
  server.get<{ Querystring: { id: string } }>(
    "/brew",
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
        // const brew = await server.brewManager.findById(request.query.id);
        const brew = await BrewModel.findById(request.query.id);
        if (brew) {
          return reply.code(200).send(brew);
        } else {
          return reply.code(404).send();
        }
      } catch (e) {
        server.log.error("Error while getting brew", e);
        return reply.code(500).send({});
      }
    }
  );
  /**
   *
   * Add a Brew
   *
   * When a producer creates a brew out of a batch,
   * this will create the Brew asset.
   * @param name - the name of the brew
   * @param producerId - the id of the producer that made the brew
   * @param batch - the id of the batch that was used to make the brew
   * @param location - the geolocation coordinates of where the brew was added
   **/
  server.post("/brew", {}, async (request, reply) => {
    let brew = request.body as Brew;
    brew = await BrewModel.create(brew);
    reply.code(201).send({ success: true, result: brew });
  });
}

import { FastifyServer } from "../../interface/server";
import { Brew, BrewModel } from "./model";

export default function routes(server: FastifyServer) {
  /**
   *
   * getBrew
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
   * addBrew
   *
   * When a grower adds a brew of grain to the blockchain.
   * This will create the grain asset on the blockchain.
   * @param growerId - the Id of the grower who will be associated with this brew
   * @param location - the geolocation coordinates of where the brew was added
   * Optional params:
   * @param size - size of grain (small, medium, large)
   * @param variety - variety of the grains
   * @param brewState - the state of the grain
   *  (READY_FOR_DISTRIBUTION, READY_FOR_BREWING, READY_FOR_SALE, SOLD?)
   **/
  server.post("/brew", {}, async (request, reply) => {
    let brew = request.body as Brew;
    brew = await BrewModel.create(brew);
    reply.code(201).send({ success: true, result: brew });
  });
}

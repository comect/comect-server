import { FastifyServer } from "../../interface/server";
import { Itinerary } from "./model";

export default function routes(server: FastifyServer) {
  /**
   * Get a full produce itinerary by the serving id
   *
   * @param id - serving id
   **/
  server.get<{ Querystring: { id: string } }>(
    "/itinerary",
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
        //     // properties: {
        //     //   id: "string",
        //     // },
        //   },
        // },
      },
    },
    async (request, reply) => {
      try {
        const itinerary: Itinerary = {
          markers: [
            {
              name: "田中さん",
              type: "Grower",
              location: { long: 139.37576471789208, lat: 35.32015919907444 },
            },
            {
              name: "万語酒造",
              type: "Producer",
              location: { long: 139.3767972323552, lat: 35.32044001988572 },
            },
            {
              name: "信洲お酒村",
              type: "Venue",
              location: { long: 139.757413, lat: 35.6664332 },
            },
          ],
          routes: [
            { long: 139.37576471789208, lat: 35.32015919907444 },
            { long: 139.3767972323552, lat: 35.32044001988572 },
            { long: 139.757413, lat: 35.6664332 },
          ],
        };
        if (itinerary) {
          return reply.code(200).send(itinerary);
        } else {
          return reply.code(404).send();
        }
      } catch (e) {
        server.log.error("Error getting itinerary", e);
        return reply.code(500).send({});
      }
    }
  );
}

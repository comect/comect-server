import Mongoose from "mongoose";
import { FastifyServer } from "../../interface/server";
import { ServingModel } from "../serving/model";
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
        const id = request.query.id;
        const aggregate = await ServingModel.aggregate([
          {
            $match: {
              _id: Mongoose.Types.ObjectId(id),
            },
          },
          {
            $project: {
              _id: 1,
              brew: 1,
              consumerId: 1,
              location: 1,
              type: "consumer",
            },
          },
          {
            $lookup: {
              from: "brews",
              localField: "brew",
              foreignField: "_id",
              as: "brew",
              pipeline: [
                {
                  $lookup: {
                    from: "batches",
                    localField: "batch",
                    foreignField: "_id",
                    as: "batch",
                  },
                },
                {
                  $project: {
                    name: 1,
                    type: "producer",
                    location: 1,
                    batch: {
                      _id: 1,
                      type: "grower",
                      location: 1,
                      name: 1,
                    },
                  },
                },
              ],
            },
          },
          // {
          //   $unwind: "$brew",
          // },
        ]);
        if (aggregate && aggregate.length > 0) {
          const itinerary: Itinerary = {
            markers: [],
            routes: [],
          };
          aggregate.forEach((a) => {
            const serving = {
              name: "Serving",
              type: a.type,
              location: a.location,
            };
            itinerary.markers.push(serving);
            itinerary.routes.push(serving.location);
            a.brew.forEach(
              (b: { name: any; type: any; location: any; batch: [] }) => {
                const brew = {
                  name: b.name,
                  type: b.type,
                  location: b.location,
                };
                itinerary.markers.push(brew);
                itinerary.routes.push(brew.location);
                b.batch.forEach(
                  (batch: { name: any; type: any; location: any }) => {
                    // const batch = {
                    //   name: b2.name,
                    //   type: b2.type,
                    //   location: b2.location,
                    // };
                    itinerary.markers.push(batch);
                    itinerary.routes.push(batch.location);
                  }
                );
              }
            );
          });
  
          // const itinerary: Itinerary = {
          //   markers: [
          //     {
          //       name: "田中さん",
          //       type: "Grower",
          //       location: { long: 139.37576471789208, lat: 35.32015919907444 },
          //     },
          //     {
          //       name: "万語酒造",
          //       type: "Producer",
          //       location: { long: 139.3767972323552, lat: 35.32044001988572 },
          //     },
          //     {
          //       name: "信洲お酒村",
          //       type: "Venue",
          //       location: { long: 139.757413, lat: 35.6664332 },
          //     },
          //   ],
          //   routes: [
          //     { long: 139.37576471789208, lat: 35.32015919907444 },
          //     { long: 139.3767972323552, lat: 35.32044001988572 },
          //     { long: 139.757413, lat: 35.6664332 },
          //   ],
          // };
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

import { FastifyServer } from "../../interface/server";

interface QueryByName {
  name: string;
}

export default function routes(server: FastifyServer) {
  server.get<{ Querystring: QueryByName }>(
    "/users",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
          required: ["name"],
        },
      },
    },
    async (request, reply) => {
      try {
        const users = await server.userManager.findByName(request.query.name);
        if (Array.isArray(users) && users.length) {
          return reply.code(200).send({ success: true });
        } else {
          return reply.code(404).send();
        }
      } catch (e) {
        server.log.error("Error while getting user", e);
        return reply.code(500).send({});
      }
    }
  );
}

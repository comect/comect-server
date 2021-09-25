import request from "supertest";
import fastify from "fastify";
import { Application } from "../../src/application";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import faker from "faker";
import { setupCustomStubs, setupEnvVars, ready } from "../util";
import * as batchService from "../helper/batch-service";
import { createServer } from "../../src/server";

const sandbox = sinon.createSandbox();

async function sideEffects(
  batchName: string,
  testGrowerId: string,
  batchLocation: any
) {
  await batchService.createBatch(batchName, testGrowerId, batchLocation);
}

async function clearSideEffects(batchName: string) {
  throw new Error("Not Implemented");
  // await deleteUsers([name]);
}

describe("Batch Endpoints Tests", () => {
  let application: Application;
  let server: FastifyServer;
  let batchName: string;
  const testGrower: { id: string; name: string } = {
    id: "1",
    name: "田中さん",
  };
  const batchLocation: { lat: number; lon: number } = {
    lat: 34.123456789,
    lon: 31.123456789,
  };

  beforeAll(async (done) => {
    setupEnvVars();
    server = createServer(fastify);
    application = new Application(server);
    await application.init();

    batchName = `${faker.lorem.word()}${faker.lorem.words(1)}`;
    batchName = `${faker.lorem.word()}${faker.lorem.words(1)}`;

    await sideEffects(batchName, testGrower.id, batchLocation);
    await ready(server, request, done);
  });

  afterAll(async () => {
    await clearSideEffects(batchName);
    await server.close();
    await application.disconnect();
  });

  beforeEach(() => {
    setupCustomStubs(sandbox);
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should return 400 without query param", async () => {
    await request(server.server).get(`/users`).expect(400);
  });

  it("should return 200", async () => {
    const res = await request(server.server)
      .get(`/users?name=${batchName}`)
      .expect(200);
    expect(res.body.success).toBe(true);
  });

  it("should return 404", async () => {
    await request(server.server).get(`/users?name=nosuchthing`).expect(404);
  });

  it("should return 500", async () => {
    const temp = server.userManager.findByName;
    server.userManager.findByName = sandbox.stub().throws();

    await request(server.server).get(`/users?name=${batchName}`).expect(500);

    server.userManager.findByName = temp;
  });
});

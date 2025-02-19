import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("Get/api", () => {
    it("Should send back a json response", async () => {
        const res = await request(server).get("/api");

        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.msg).toBe("Desde la API");

        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe("desde la API");
    })
})

jest.mock("../config/db");

describe("ConectDB", () => {
    it("Should handle database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValue(new Error("Hubo un error al conectar a la DB"));
        const consoleSpy = jest.spyOn(console, "log");

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error al conectar a la base de datos"));
    })
})
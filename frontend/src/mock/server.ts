import { createServer, Model } from "miragejs";
import { user, resumes, vacancies } from "./mock.js";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,
    models: {
      users: Model,
      resumes: Model,
      vacancies: Model,
    },
    routes() {
      this.get("http://localhost:4000/api/me", (schema) => {
        return user;
      });
      this.get("http://localhost:4000/api/resumes/mine", (schema) => {
        return resumes;
      });
      this.get(
        "http://localhost:4000/api/resumes/:id/similar_vacancies/:page",
        (schema) => {
          return vacancies;
        },
      );
    },
  });
  return server;
}

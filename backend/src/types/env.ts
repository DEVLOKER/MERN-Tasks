import { z } from "zod";
import { env } from "process";

const envVariables = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]), //.default("development"),
    HTTP_PORT: z.number(),
    DB_URL: z.string(),
    ITEMS_PER_PAGE: z.number(),
});

const envServer = envVariables.safeParse(env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {}
    }
}

// export const envServerSchema = envServer.data;

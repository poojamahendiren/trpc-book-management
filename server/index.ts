// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
// import { db } from "./db";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await prisma.user.findMany();
      return users;
    }),
  userById: publicProcedure
    .input(z.number())
    .query(async (opts) => {
      const { input } = opts;
      const user = await prisma.user.findUnique({
        where:{
          id:input
        }
      });
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(),email:z.string()}))
    .mutation(async (opts) => {
      const { name,email } = opts.input;
      const user = await prisma.user.create({data:{name,email}});
      return user;
    }),
});
 
export type AppRouter = typeof appRouter;
 

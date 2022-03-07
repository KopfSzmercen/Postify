import express from "express";

export type MyContext = {
  req: express.Request & { session: { userId: number } };
  res: express.Response;
};

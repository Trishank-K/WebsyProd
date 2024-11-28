// main.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server";

export const authenticateUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return { user };
};

const f = createUploadthing();

export const ourFileRouter = {
  subaccountLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => authenticateUser())
    .onUploadError((error) => {
      console.log(error);
    })
    .onUploadComplete(() => {}),
  avatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => authenticateUser())
    .onUploadComplete(() => {}),
  agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => authenticateUser())
    .onUploadError((error) => {
      console.log(error);
    })
    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => authenticateUser())
    .onUploadError((error) => {
      console.log(error);
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

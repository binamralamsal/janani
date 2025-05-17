import crypto from "crypto";
import fs from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";

import { json } from "@tanstack/react-start";

import { db } from "@/config/db";

export const ServerRoute = createServerFileRoute().methods({
  POST: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return json({ status: "ERROR", message: "No file uploaded" });
    }

    const hash = crypto.randomBytes(10).toString("hex");
    const fileName = `${hash}-${file.name}`;
    const uploadedFilePath = `./public/uploads/${fileName}`;
    const fileURL = `/api/public/uploads/${fileName}`;

    try {
      const asyncIterable = await readableStreamToAsyncIterable(file.stream());
      const nodeStream = Readable.from(asyncIterable);
      const fileStream = fs.createWriteStream(uploadedFilePath);

      await pipeline(nodeStream, fileStream);

      const values = await db
        .insertInto("uploadedFiles")
        .values({
          name: fileName,
          fileType: file.type,
          url: fileURL,
        })
        .returningAll()
        .executeTakeFirst();

      return json({
        message: "File Uploaded successfully.",
        status: "SUCCESS",
        details: values,
      });
    } catch {
      return json({
        message: `Error occured while uploading. Please try again.`,
        status: "ERROR",
      });
    }
  },
});

async function readableStreamToAsyncIterable(
  stream: ReadableStream<Uint8Array>,
) {
  const reader = stream.getReader();

  return {
    async *[Symbol.asyncIterator]() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield value;
      }
    },
  };
}

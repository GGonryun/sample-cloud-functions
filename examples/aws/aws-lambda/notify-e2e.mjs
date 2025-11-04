import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-west-2"});
const AWS_TEST_BUCKET = "p0-e2e-stage-custom-notifier"

export const handler = async (event) => {
  console.log("Incoming event:", JSON.stringify(event));

  if (event.eventType === "preapproval-created") {
    const reason = event?.data?.reason || "";
    const match = reason.match(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
    );

    if (match) {
      const id = match[0];

      try {
        await s3.send(
          new PutObjectCommand({
            Bucket: AWS_TEST_BUCKET,
            Key: id,
            Body: "", // empty file
            ContentType: "text/plain",
          })
        );

        console.log(`✅ Created empty file: s3://${AWS_TEST_BUCKET}/${id}`);
      } catch (err) {
        console.error("❌ Error creating file in S3:", err);
        return {
          status: "500",
          body: "Failed to write file to S3.",
        };
      }
    } else {
      console.warn("⚠️ No UUID found in reason field.");
    }
  } else {
    console.log(`ℹ️ Event type is not 'preapproval-created': ${event.eventType}`);
  }

  return {
    status: "200",
    body: "OK",
  };
};

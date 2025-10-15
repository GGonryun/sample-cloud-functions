const functions = require("@google-cloud/functions-framework");
const { Storage } = require("@google-cloud/storage");

// --- GCS setup ---
const storage = new Storage();
const BUCKET_NAME = "p0-test-custom-resource-bucket";

async function writeSingleLineFile(requestId, line) {
  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(requestId);
  // Content is exactly permission?.item as a single line (plus trailing newline)
  const body = `${line ?? ""}\n`;
  await file.save(body, {
    contentType: "text/plain; charset=utf-8",
    resumable: false,
  });
  return { bucket: BUCKET_NAME, key: file.name };
}

async function deleteFile(requestId) {
  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(requestId);
  await file.delete({ ignoreNotFound: true }); // no-throw if already gone
  return { bucket: BUCKET_NAME, key: file.name };
}

// Register the function
functions.http("e2e", async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).send("Method Not Allowed");

    const body = req.body;

    // List available resources
    if (body?.eventType === "list") {
      const items = [
        {
          label: "Production Database",
          category: "Database",
          identifier: "db-production",
        },
        {
          label: "Staging Database",
          category: "Database",
          identifier: "db-staging",
        },
        {
          label: "Analytics Cluster",
          category: "Compute",
          identifier: "compute-analytics",
        },
        {
          label: "API Gateway",
          category: "Network",
          identifier: "network-api-gateway",
        },
        {
          label: "Storage Bucket - Documents",
          category: "Storage",
          identifier: "storage-documents",
        },
        {
          label: "Storage Bucket - Media",
          category: "Storage",
          identifier: "storage-media",
        },
        {
          label: "CI/CD Pipeline",
          category: "DevOps",
          identifier: "devops-cicd-pipeline",
        },
      ];
      return res.status(200).json({ items });
    }

    // Grant → write file named by requestId with single line permission?.item
    if (body?.eventType === "grant") {
      const { requestId, permission } = body.data || {};
      const type = permission?.item;
      if (!type) return res.status(400).send("Missing permission item");
      const loc = await writeSingleLineFile(type, requestId);
      console.log(
        `Wrote gs://${loc.bucket}/${loc.key} with line: "${requestId}"`
      );
      return res.status(200).json({ success: true, file: loc });
    }

    // Revoke → delete file named by requestId
    if (body?.eventType === "revoke") {
      const { permission } = body.data || {};
      const type = permission?.item;
      if (!type) return res.status(400).send("Missing permission item");
      const loc = await deleteFile(type);
      console.log(`Deleted gs://${loc.bucket}/${loc.key} (if it existed)`);
      return res.status(200).json({ success: true, deleted: true, file: loc });
    }

    return res.status(400).send("Unsupported eventType");
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e?.message || e) });
  }
});

const express = require("express");
const app = express();

app.use(express.json()); // Parses JSON bodies

app.all("/", (req, res) => {
  if (req.method === "GET") {
    return res.send("OK\n");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const body = req.body;

  // Handle list requests
  if (body?.eventType === "list") {
    const results = [
      {
        label: "Database Cluster",
        category: "Infrastructure",
        identifier: "db-cluster-001",
      },
      {
        label: "Web Frontend",
        category: "Application",
        identifier: "web-frontend-001",
      },
      {
        label: "Internal API",
        category: undefined,
        identifier: "api-internal-001",
      },
    ];

    return res.status(200).json(results);
  }

  // Handle grant/revoke requests
  if (body?.eventType === "grant" || body?.eventType === "revoke") {
    const { requestId, type, principal, requestor, permission } =
      body.data || {};

    console.log(`[${body.eventType.toUpperCase()}] Access change requested`);
    console.log(`Request ID: ${requestId}`);
    console.log(`Resource Type: ${type}`);
    console.log(`Principal: ${principal}`);
    console.log(`Requested By: ${requestor}`);
    console.log(`Permission Item: ${permission?.item}`);

    return res.status(200).json({ success: true });
  }

  // Unknown eventType
  console.warn("Unknown eventType received:", body?.eventType);
  return res.status(400).json({ error: "Unsupported eventType" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

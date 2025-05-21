const functions = require("@google-cloud/functions-framework");

// Register the function
functions.http("helloHttp", (req, res) => {
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
        category: "Application",
        identifier: "api-internal-001",
      },
      {
        label: "External API",
        category: "Application",
        identifier: "api-external-001",
      },
      {
        label: "Data Warehouse",
        category: "Infrastructure",
        identifier: "data-warehouse-001",
      },
      {
        label: "Cache Service",
        category: "Infrastructure",
        identifier: "cache-service-001",
      },
      {
        label: "Load Balancer",
        category: "Infrastructure",
        identifier: "load-balancer-001",
      },
    ];

    return res.status(200).json(results);
  }

  // Handle grant/revoke requests
  if (body?.eventType === "grant" || body?.eventType === "revoke") {
    const { requestId, type, principal, requestor, permission } = body.data;

    console.log(`[${body.eventType.toUpperCase()}] Access change requested`);
    console.log(`Request ID: ${requestId}`);
    console.log(`Resource Type: ${type}`);
    console.log(`Principal: ${principal}`);
    console.log(`Requested By: ${requestor}`);
    console.log(`Permission Item: ${permission?.item}`);

    return res.status(200).json({ success: true });
  }

  // Unsupported eventType
  res.status(400).send("Unsupported eventType");
});

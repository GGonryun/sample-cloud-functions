const items = [
  // Compute Resources
  {
    label: "Web Server VM",
    category: "Compute",
    identifier: "web-server-vm",
  },
  {
    label: "Application Server",
    category: "Compute",
    identifier: "application-server",
  },
  {
    label: "GPU Instance",
    category: "Compute",
    identifier: "gpu-instance",
  },
  {
    label: "Container Host",
    category: "Compute",
    identifier: "container-host",
  },

  // Storage Resources
  {
    label: "Object Storage Bucket",
    category: "Storage",
    identifier: "object-storage-bucket",
  },
  {
    label: "Block Storage Volume",
    category: "Storage",
    identifier: "block-storage-volume",
  },
  {
    label: "File System Share",
    category: "Storage",
    identifier: "file-system-share",
  },
  {
    label: "Archive Storage",
    category: "Storage",
    identifier: "archive-storage",
  },

  // Database Resources
  {
    label: "Relational Database",
    category: "Database",
    identifier: "relational-database",
  },
  {
    label: "NoSQL Database",
    category: "Database",
    identifier: "nosql-database",
  },
  {
    label: "In Memory Cache",
    category: "Database",
    identifier: "in-memory-cache",
  },
  {
    label: "Data Warehouse",
    category: "Database",
    identifier: "data-warehouse",
  },

  // Networking Resources
  {
    label: "Virtual Network",
    category: "Networking",
    identifier: "virtual-network",
  },
  {
    label: "Load Balancer",
    category: "Networking",
    identifier: "load-balancer",
  },
  {
    label: "Content Delivery Network",
    category: "Networking",
    identifier: "content-delivery-network",
  },
  {
    label: "API Gateway",
    category: "Networking",
    identifier: "api-gateway",
  },

  // Security Resources
  {
    label: "Firewall Rules",
    category: "Security",
    identifier: "firewall-rules",
  },
  {
    label: "Identity Management",
    category: "Security",
    identifier: "identity-management",
  },
  {
    label: "SSL Certificate",
    category: "Security",
    identifier: "ssl-certificate",
  },
  {
    label: "Data Encryption Key",
    category: "Security",
    identifier: "data-encryption-key",
  },

  // Analytics Resources
  {
    label: "Data Pipeline",
    category: "Analytics",
    identifier: "data-pipeline",
  },
  {
    label: "Machine Learning Model",
    category: "Analytics",
    identifier: "machine-learning-model",
  },
  {
    label: "Log Analytics",
    category: "Analytics",
    identifier: "log-analytics",
  },
  {
    label: "Stream Processing",
    category: "Analytics",
    identifier: "stream-processing",
  },
];

export const handler = async (event, context) => {
  console.log("Received Event:", JSON.stringify(event));
  if (event.eventType === "list") {
    return { items };
  }

  return "ok";
};

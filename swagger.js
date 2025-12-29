const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Lorry Load Track API",
            version: "1.0.0",
            description:
                "Backend API for tracking lorry check-ins, loading workflow, check-outs, and comments."
        },

        servers: [
            {
                url: "http://localhost:8000",
                description: "Local development server"
            }
        ],

        tags: [
            {
                name: "Lorries",
                description: "Lorry tracking and status management"
            },
            {
                name: "Comments",
                description: "Comments on lorry status history"
            }
        ],

        paths: {
            /* ========================= LORRIES ========================= */

            "/lorries": {
                get: {
                    tags: ["Lorries"],
                    summary: "Get all lorries",
                    responses: {
                        200: {
                            description: "List of all lorries",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Lorry" }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "/lorries/add-lorry": {
                post: {
                    tags: ["Lorries"],
                    summary: "Add a new lorry",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/CreateLorryRequest" }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Lorry added successfully" },
                        400: { description: "Missing required fields" }
                    }
                }
            },

            "/lorries/{id}": {
                get: {
                    tags: ["Lorries"],
                    summary: "Get lorry by ID",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    responses: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Lorry" }
                                }
                            }
                        },
                        404: { description: "Lorry not found" }
                    }
                }
            },

            "/lorries/{id}/history": {
                get: {
                    tags: ["Lorries"],
                    summary: "Get lorry status history",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    responses: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/StatusHistoryItem" }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "/lorries/{id}/update-registration-number": {
                put: {
                    tags: ["Lorries"],
                    summary: "Update registration number",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["regNum"],
                                    properties: {
                                        regNum: { type: "string", example: "lm12abc" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Registration number updated" }
                    }
                }
            },

            "/lorries/{id}/update-material-name": {
                put: {
                    tags: ["Lorries"],
                    summary: "Update material name",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["materialName"],
                                    properties: {
                                        materialName: { type: "string", example: "PET_CLEAR" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Material name updated" }
                    }
                }
            },

            "/lorries/{id}/update-customer-name": {
                put: {
                    tags: ["Lorries"],
                    summary: "Update customer name",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["customerName"],
                                    properties: {
                                        customerName: { type: "string", example: "MRL" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Customer name updated" }
                    }
                }
            },

            "/lorries/{id}/update-collection-reference-number": {
                put: {
                    tags: ["Lorries"],
                    summary: "Update collection reference number",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["collectionRefNum"],
                                    properties: {
                                        collectionRefNum: { type: "string", example: "ab456xy" }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Collection reference updated" }
                    }
                }
            },

            "/lorries/{id}/update-status": {
                put: {
                    tags: ["Lorries"],
                    summary: "Update lorry status",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/UpdateStatusRequest" }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Status updated" },
                        409: { description: "Status already applied" }
                    }
                }
            },

            "/lorries/{id}/delete": {
                delete: {
                    tags: ["Lorries"],
                    summary: "Delete a lorry",
                    parameters: [{ $ref: "#/components/parameters/LorryId" }],
                    responses: {
                        200: { description: "Lorry deleted" }
                    }
                }
            },

            /* ========================= COMMENTS ========================= */

            "/comments/{lorryId}/{status}": {
                post: {
                    tags: ["Comments"],
                    summary: "Add a comment to a lorry status",
                    parameters: [
                        { name: "lorryId", in: "path", required: true },
                        { name: "status", in: "path", required: true }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/CreateCommentRequest" }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Comment added successfully" }
                    }
                },
                get: {
                    tags: ["Comments"],
                    summary: "Get all comments for a lorry status",
                    parameters: [
                        { name: "lorryId", in: "path", required: true },
                        { name: "status", in: "path", required: true }
                    ],
                    responses: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Comment" }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "/comments/{commentId}": {
                get: {
                    tags: ["Comments"],
                    summary: "Get a single comment",
                    parameters: [{ name: "commentId", in: "path", required: true }],
                    responses: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Comment" }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: ["Comments"],
                    summary: "Update a comment",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/UpdateCommentRequest" }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Comment updated successfully" }
                    }
                },
                delete: {
                    tags: ["Comments"],
                    summary: "Delete a comment",
                    responses: {
                        200: { description: "Comment deleted successfully" }
                    }
                }
            }
        },

        components: {
            parameters: {
                LorryId: {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string", example: "1" }
                }
            },

            schemas: {
                Comment: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "c-1700000000000" },
                        userId: { type: "string", example: "u-002" },
                        text: { type: "string", example: "Loading started" },
                        timestamp: {
                            type: "string",
                            format: "date-time",
                            example: "2025-12-27T09:11:00Z"
                        }
                    }
                },

                StatusHistoryItem: {
                    type: "object",
                    properties: {
                        status: { $ref: "#/components/schemas/LorryStatus" },
                        timestamp: { type: "string", format: "date-time" },
                        updatedBy: {
                            type: "object",
                            properties: {
                                userId: { type: "string", example: "u-003" }
                            }
                        },
                        comments: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Comment" }
                        }
                    }
                },

                Lorry: {
                    type: "object",
                    properties: {
                        lorryId: { type: "string", example: "1" },
                        regNum: { type: "string", example: "pz65pwo" },
                        materialName: { type: "string", example: "PET_CLEAR" },
                        customerName: { type: "string", example: "MRL" },
                        collectionRefNum: { type: "string", example: "vg123sd" },
                        checkedInAt: { type: "string", format: "date-time" },
                        checkedOutAt: {
                            type: ["string", "null"],
                            format: "date-time"
                        },
                        currentStatus: { $ref: "#/components/schemas/LorryStatus" },
                        statusHistory: {
                            type: "array",
                            items: { $ref: "#/components/schemas/StatusHistoryItem" }
                        }
                    }
                },

                LorryStatus: {
                    type: "string",
                    enum: ["CHECKED_IN", "LOADING", "LOADED", "CHECKED_OUT"]
                },

                CreateLorryRequest: {
                    type: "object",
                    required: ["materialName", "customerName", "collectionRefNum", "updatedBy"],
                    properties: {
                        materialName: { type: "string" },
                        customerName: { type: "string" },
                        collectionRefNum: { type: "string" },
                        updatedBy: {
                            type: "object",
                            properties: {
                                userId: { type: "string", example: "u-002" }
                            }
                        }
                    }
                },

                UpdateStatusRequest: {
                    type: "object",
                    required: ["status", "updatedBy"],
                    properties: {
                        status: { $ref: "#/components/schemas/LorryStatus" },
                        updatedBy: {
                            type: "object",
                            properties: {
                                userId: { type: "string", example: "u-002" }
                            }
                        },
                        comment: { type: "string" }
                    }
                },

                CreateCommentRequest: {
                    type: "object",
                    required: ["newComment"],
                    properties: {
                        newComment: {
                            type: "object",
                            required: ["userId", "text"],
                            properties: {
                                userId: { type: "string", example: "u-002" },
                                text: { type: "string", example: "All good" }
                            }
                        }
                    }
                },

                UpdateCommentRequest: {
                    type: "object",
                    required: ["text"],
                    properties: {
                        text: { type: "string", example: "Updated comment text" }
                    }
                }
            }
        }
    },

    apis: []
};

module.exports = swaggerJSDoc(options);

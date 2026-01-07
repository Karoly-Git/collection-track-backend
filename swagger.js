const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Collection Track API",
            version: "1.0.0",
            description:
                "Backend API for tracking collection check-ins, status workflow, check-outs, and comments."
        },

        servers: [
            {
                url: "http://localhost:8000",
                description: "Local development server"
            }
        ],

        tags: [
            {
                name: "Collections",
                description: "Collection tracking and status management"
            },
            {
                name: "Comments",
                description: "Comments on collection status history"
            }
        ],

        paths: {
            /* ========================= COLLECTIONS ========================= */

            "/collections": {
                get: {
                    tags: ["Collections"],
                    summary: "Get all collections",
                    responses: {
                        200: {
                            description: "List of all collections",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Collection" }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ["Collections"],
                    summary: "Add a new collection",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/CreateCollectionRequest" }
                            }
                        }
                    },
                    responses: {
                        201: { description: "Collection created" },
                        400: { description: "Missing required fields" }
                    }
                }
            },

            "/collections/{collectionId}": {
                get: {
                    tags: ["Collections"],
                    summary: "Get collection by ID",
                    parameters: [{ $ref: "#/components/parameters/CollectionId" }],
                    responses: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Collection" }
                                }
                            }
                        },
                        404: { description: "Collection not found" }
                    }
                },
                delete: {
                    tags: ["Collections"],
                    summary: "Delete a collection",
                    parameters: [{ $ref: "#/components/parameters/CollectionId" }],
                    responses: {
                        200: { description: "Collection deleted" }
                    }
                }
            },

            "/collections/{collectionId}/history": {
                get: {
                    tags: ["Collections"],
                    summary: "Get collection status history",
                    parameters: [{ $ref: "#/components/parameters/CollectionId" }],
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

            "/collections/{collectionId}/status": {
                patch: {
                    tags: ["Collections"],
                    summary: "Update collection status",
                    parameters: [{ $ref: "#/components/parameters/CollectionId" }],
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
                        400: { description: "Invalid status" },
                        409: { description: "Status already applied" }
                    }
                }
            },

            /* ========================= COMMENTS ========================= */

            "/comments/collection/{collectionId}/status/{status}": {
                post: {
                    tags: ["Comments"],
                    summary: "Add comment to a collection status",
                    parameters: [
                        { $ref: "#/components/parameters/CollectionId" },
                        {
                            name: "status",
                            in: "path",
                            required: true,
                            schema: { $ref: "#/components/schemas/CollectionStatus" }
                        }
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
                        201: { description: "Comment added" }
                    }
                },
                get: {
                    tags: ["Comments"],
                    summary: "Get comments for a collection status",
                    parameters: [
                        { $ref: "#/components/parameters/CollectionId" },
                        {
                            name: "status",
                            in: "path",
                            required: true,
                            schema: { $ref: "#/components/schemas/CollectionStatus" }
                        }
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
                    parameters: [{ $ref: "#/components/parameters/CommentId" }],
                    responses: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Comment" }
                                }
                            }
                        },
                        404: { description: "Comment not found" }
                    }
                },
                patch: {
                    tags: ["Comments"],
                    summary: "Update a comment",
                    parameters: [{ $ref: "#/components/parameters/CommentId" }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/UpdateCommentRequest" }
                            }
                        }
                    },
                    responses: {
                        200: { description: "Comment updated" }
                    }
                },
                delete: {
                    tags: ["Comments"],
                    summary: "Delete a comment",
                    parameters: [{ $ref: "#/components/parameters/CommentId" }],
                    responses: {
                        200: { description: "Comment deleted" }
                    }
                }
            }
        },

        components: {
            parameters: {
                CollectionId: {
                    name: "collectionId",
                    in: "path",
                    required: true,
                    schema: { type: "string", example: "1" }
                },
                CommentId: {
                    name: "commentId",
                    in: "path",
                    required: true,
                    schema: { type: "string", example: "c-1700000000000" }
                }
            },

            schemas: {
                Comment: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        userId: { type: "string" },
                        text: { type: "string" },
                        timestamp: { type: "string", format: "date-time" }
                    }
                },

                StatusHistoryItem: {
                    type: "object",
                    properties: {
                        status: { $ref: "#/components/schemas/CollectionStatus" },
                        timestamp: { type: "string", format: "date-time" },
                        updatedByUserId: { type: "string" },
                        comments: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Comment" }
                        }
                    }
                },

                Collection: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        materialName: { type: "string" },
                        customerName: { type: "string" },
                        collectionRefNum: { type: "string" },
                        lorryRegNum: { type: "string" },
                        checkedInAt: { type: "string", format: "date-time" },
                        checkedOutAt: { type: ["string", "null"], format: "date-time" },
                        currentStatus: { $ref: "#/components/schemas/CollectionStatus" },
                        statusHistory: {
                            type: "array",
                            items: { $ref: "#/components/schemas/StatusHistoryItem" }
                        }
                    }
                },

                CollectionStatus: {
                    type: "string",
                    enum: ["CHECKED_IN", "LOADING", "LOADED", "CHECKED_OUT"]
                },

                CreateCollectionRequest: {
                    type: "object",
                    required: [
                        "materialName",
                        "customerName",
                        "collectionRefNum",
                        "updatedByUserId"
                    ],
                    properties: {
                        materialName: { type: "string" },
                        customerName: { type: "string" },
                        collectionRefNum: { type: "string" },
                        lorryRegNum: { type: "string" },
                        updatedByUserId: { type: "string" },
                        comment: { type: "string" }
                    }
                },

                UpdateStatusRequest: {
                    type: "object",
                    required: ["status", "updatedByUserId"],
                    properties: {
                        status: { $ref: "#/components/schemas/CollectionStatus" },
                        updatedByUserId: { type: "string" },
                        comment: { type: "string" }
                    }
                },

                CreateCommentRequest: {
                    type: "object",
                    required: ["userId", "text"],
                    properties: {
                        userId: { type: "string" },
                        text: { type: "string" }
                    }
                },

                UpdateCommentRequest: {
                    type: "object",
                    required: ["text"],
                    properties: {
                        text: { type: "string" }
                    }
                }
            }
        }
    },

    apis: []
};

module.exports = swaggerJSDoc(options);

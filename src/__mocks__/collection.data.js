import COLLECTION_STATUSES from "../constants/collection-statuses.js";
import MATERIAL_NAMES from "../constants/material-names.js";
import CUSTOMER_NAMES from "../constants/customer-names.js";

const data = [
    {
        id: "1",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "peute 1234",
        lorryRegNum: "pz65pwo",
        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedByUserId: "wb-001",
                comments: [
                    {
                        id: "1-CHECKED_IN-2025-12-27T08:41:00Z",
                        userId: "wb-002",
                        text: "Lorry arrived on time.",
                        timestamp: "2025-12-27T08:41:00Z"
                    },
                    {
                        id: "1-CHECKED_IN-2025-12-27T08:55:00Z",
                        userId: "flt-003",
                        text: "I am FLT driver and Lorry driver punched me",
                        timestamp: "2025-12-27T08:55:00Z"
                    },
                    {
                        id: "1-CHECKED_IN-2025-12-27T08:56:00Z",
                        userId: "sv-004",
                        text: "I am Supervisor and punched the Lorry driver",
                        timestamp: "2025-12-27T08:56:00Z"
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        materialName: MATERIAL_NAMES.PET_CLEAR,
        customerName: CUSTOMER_NAMES.MRL,
        collectionRefNum: "ab456xy",
        lorryRegNum: "lm12abc",
        checkedInAt: "2025-12-27T08:55:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.LOADING,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:55:00Z",
                updatedByUserId: "wb-002",
                comments: [
                    {
                        id: "2-CHECKED_IN-2025-12-27T08:56:00Z",
                        userId: "u-002",
                        text: "Checked in at weighbridge.",
                        timestamp: "2025-12-27T08:56:00Z"
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADING,
                timestamp: "2025-12-27T09:10:00Z",
                updatedByUserId: "flt-1",
                comments: [
                    {
                        id: "2-LOADING-2025-12-27T09:11:00Z",
                        userId: "u-003",
                        text: "Started loading PET clear.",
                        timestamp: "2025-12-27T09:11:00Z"
                    }
                ]
            }
        ]
    },
    {
        id: "3",
        materialName: MATERIAL_NAMES.HDPE_NATURAL,
        customerName: CUSTOMER_NAMES.VOLKER,
        collectionRefNum: "vl1234",
        lorryRegNum: "qr34def",
        checkedInAt: "2025-12-27T07:50:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.LOADED,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T07:50:00Z",
                updatedByUserId: "wb-001",
                comments: [
                    {
                        id: "3-CHECKED_IN-2025-12-27T07:51:00Z",
                        userId: "u-002",
                        text: "I have checked in the lorry.",
                        timestamp: "2025-12-27T07:51:00Z"
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADING,
                timestamp: "2025-12-27T08:05:00Z",
                updatedByUserId: "flt-2",
                comments: [
                    {
                        id: "3-LOADING-2025-12-27T08:06:00Z",
                        userId: "u-003",
                        text: "I have started loading the lorry.",
                        timestamp: "2025-12-27T08:06:00Z"
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADED,
                timestamp: "2025-12-27T09:00:00Z",
                updatedByUserId: "flt-3",
                comments: [
                    {
                        id: "3-LOADED-2025-12-27T09:01:00Z",
                        userId: "u-003",
                        text: "I have completed loading the lorry.",
                        timestamp: "2025-12-27T09:01:00Z"
                    }
                ]
            }
        ]
    },
    {
        id: "4",
        materialName: MATERIAL_NAMES.GLASS,
        customerName: CUSTOMER_NAMES.URM,
        collectionRefNum: "gh012ij",
        lorryRegNum: "st56ghi",
        checkedInAt: "2025-12-27T06:45:00Z",
        checkedOutAt: "2025-12-27T08:30:00Z",
        currentStatus: COLLECTION_STATUSES.CHECKED_OUT,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T06:45:00Z",
                updatedByUserId: "wb-002",
                comments: [
                    {
                        id: "4-CHECKED_IN-2025-12-27T06:46:00Z",
                        userId: "u-002",
                        text: "Glass lorry checked in.",
                        timestamp: "2025-12-27T06:46:00Z"
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADING,
                timestamp: "2025-12-27T07:00:00Z",
                updatedByUserId: "flt-1",
                comments: [
                    {
                        id: "4-LOADING-2025-12-27T07:01:00Z",
                        userId: "u-004",
                        text: "Loading glass containers.",
                        timestamp: "2025-12-27T07:01:00Z"
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADED,
                timestamp: "2025-12-27T07:55:00Z",
                updatedByUserId: "flt-2",
                comments: [
                    {
                        id: "4-LOADED-2025-12-27T07:56:00Z",
                        userId: "u-004",
                        text: "Glass fully loaded.",
                        timestamp: "2025-12-27T07:56:00Z"
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.CHECKED_OUT,
                timestamp: "2025-12-27T08:30:00Z",
                updatedByUserId: "wb-001",
                comments: [
                    {
                        id: "4-CHECKED_OUT-2025-12-27T08:31:00Z",
                        userId: "u-002",
                        text: "Lorry checked out.",
                        timestamp: "2025-12-27T08:31:00Z"
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        materialName: MATERIAL_NAMES.STEEL_CANS,
        customerName: CUSTOMER_NAMES.UN_GLOBAL,
        collectionRefNum: "kl345mn",
        lorryRegNum: "uv78jkl",
        checkedInAt: "2025-12-27T09:20:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T09:20:00Z",
                updatedByUserId: "wb-002",
                comments: [
                    {
                        id: "5-CHECKED_IN-2025-12-27T09:21:00Z",
                        userId: "u-002",
                        text: "Metal lorry checked in.",
                        timestamp: "2025-12-27T09:21:00Z"
                    }
                ]
            }
        ]
    },
    {
        id: "6",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "vg123sd",
        lorryRegNum: "pz65pwo",
        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    },
    {
        id: "7",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "vg123sd",
        lorryRegNum: "pz65pwo",
        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    },
    {
        id: "8",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "vg123sd",
        lorryRegNum: "pz65pwo",
        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    },
    {
        id: "9",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "vg123sd",
        lorryRegNum: "pz65pwo",
        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    },
    {
        id: "10",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "vg123sd",
        lorryRegNum: "pz65pwo",
        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    },
];

export default data;

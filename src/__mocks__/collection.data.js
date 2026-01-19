import COLLECTION_STATUSES from "../constants/collection-statuses.js";
import MATERIAL_NAMES from "../constants/material-names.js";
import CUSTOMER_NAMES from "../constants/customer-names.js";

/**
 * Base date for collections (YYYY-MM-DD)
 */
const BASE_COLLECTION_DATE = "2026-01-19";

/**
 * Returns YYYY-MM-DD shifted by N days
 */
const offsetDate = (days = 0) => {
    const date = new Date(`${BASE_COLLECTION_DATE}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
};

/**
 * Build timestamp with optional day offset
 */
const withDate = (time, dayOffset = 0) =>
    `${offsetDate(dayOffset)}T${time}Z`;

const data = [
    {
        id: "1",
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "peute 1234",
        lorryRegNum: "pz65pwo",
        checkedInAt: withDate("08:40:00"),
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: withDate("08:40:00"),
                updatedByUserId: "wb-001",
                comments: [
                    {
                        id: "1-CHECKED_IN",
                        userId: "wb-002",
                        text: "Lorry arrived on time.",
                        timestamp: withDate("08:41:00")
                    },
                    {
                        id: "1-CHECKED_IN_2",
                        userId: "flt-003",
                        text: "I am FLT driver and Lorry driver punched me",
                        timestamp: withDate("08:55:00")
                    },
                    {
                        id: "1-CHECKED_IN_3",
                        userId: "sv-004",
                        text: "I am Supervisor and punched the Lorry driver",
                        timestamp: withDate("08:56:00")
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
        checkedInAt: withDate("08:55:00"),
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.LOADING,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: withDate("08:55:00"),
                updatedByUserId: "wb-002",
                comments: [
                    {
                        id: "2-CHECKED_IN",
                        userId: "u-002",
                        text: "Checked in at weighbridge.",
                        timestamp: withDate("08:56:00")
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADING,
                timestamp: withDate("09:10:00"),
                updatedByUserId: "flt-1",
                comments: [
                    {
                        id: "2-LOADING",
                        userId: "u-003",
                        text: "Started loading PET clear.",
                        timestamp: withDate("09:11:00")
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
        checkedInAt: withDate("07:50:00"),
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.LOADED,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: withDate("07:50:00"),
                updatedByUserId: "wb-001",
                comments: [
                    {
                        id: "3-CHECKED_IN",
                        userId: "u-002",
                        text: "I have checked in the lorry.",
                        timestamp: withDate("07:51:00")
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADING,
                timestamp: withDate("08:05:00"),
                updatedByUserId: "flt-2",
                comments: [
                    {
                        id: "3-LOADING",
                        userId: "u-003",
                        text: "I have started loading the lorry.",
                        timestamp: withDate("08:06:00")
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADED,
                timestamp: withDate("09:00:00"),
                updatedByUserId: "flt-3",
                comments: [
                    {
                        id: "3-LOADED",
                        userId: "u-003",
                        text: "I have completed loading the lorry.",
                        timestamp: withDate("09:01:00")
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
        checkedInAt: withDate("06:45:00"),
        checkedOutAt: withDate("08:30:00"),
        currentStatus: COLLECTION_STATUSES.CHECKED_OUT,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: withDate("06:45:00"),
                updatedByUserId: "wb-002",
                comments: [
                    {
                        id: "4-CHECKED_IN",
                        userId: "u-002",
                        text: "Glass lorry checked in.",
                        timestamp: withDate("06:46:00")
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADING,
                timestamp: withDate("07:00:00"),
                updatedByUserId: "flt-1",
                comments: [
                    {
                        id: "4-LOADING",
                        userId: "u-004",
                        text: "Loading glass containers.",
                        timestamp: withDate("07:01:00")
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.LOADED,
                timestamp: withDate("07:55:00"),
                updatedByUserId: "flt-2",
                comments: [
                    {
                        id: "4-LOADED",
                        userId: "u-004",
                        text: "Glass fully loaded.",
                        timestamp: withDate("07:56:00")
                    }
                ]
            },
            {
                status: COLLECTION_STATUSES.CHECKED_OUT,
                timestamp: withDate("08:30:00"),
                updatedByUserId: "wb-001",
                comments: [
                    {
                        id: "4-CHECKED_OUT",
                        userId: "u-002",
                        text: "Lorry checked out.",
                        timestamp: withDate("08:31:00")
                    }
                ]
            }
        ]
    },
    // LAST few — automatically 1 day earlier
    ...["5", "6"].map((id) => ({
        id,
        materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
        customerName: CUSTOMER_NAMES.PEUTE,
        collectionRefNum: "vg123sd",
        lorryRegNum: "pz65pwo",
        checkedInAt: withDate("08:40:00", -1),
        checkedOutAt: null,
        currentStatus: COLLECTION_STATUSES.CHECKED_IN,
        statusHistory: [
            {
                status: COLLECTION_STATUSES.CHECKED_IN,
                timestamp: withDate("08:40:00", -1),
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    }))
];

export default data;

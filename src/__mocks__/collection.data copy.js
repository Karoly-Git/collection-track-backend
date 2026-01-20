import COLLECTION_STATUSES from "../constants/collection-statuses.js";
import MATERIAL_NAMES from "../constants/material-names.js";
import CUSTOMER_NAMES from "../constants/customer-names.js";

/**
 * ─────────────────────────────────────────────
 * Time helpers
 * ─────────────────────────────────────────────
 */

/**
 * ISO timestamp for "now minus N minutes"
 */
const minutesAgo = (minutes) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutes);
    return date.toISOString();
};

/**
 * ISO timestamp for "N days ago minus M minutes"
 */
const minutesAgoWithDayOffset = (daysAgo, minutes) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - daysAgo);
    date.setMinutes(date.getMinutes() - minutes);
    return date.toISOString();
};

/**
 * Random integer between min & max (inclusive)
 */
const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Buckets:
 *  - short  → 15–59 mins
 *  - medium → 60–119 mins
 *  - long   → 120–180 mins
 */
const getCheckedInAtByBucket = (bucket) => {
    switch (bucket) {
        case "short":
            return minutesAgo(randomBetween(15, 59));
        case "medium":
            return minutesAgo(randomBetween(60, 119));
        case "long":
            return minutesAgo(randomBetween(120, 180));
        default:
            throw new Error("Invalid time bucket");
    }
};

/**
 * Same buckets, but 1 day ago
 */
const getCheckedInAtByBucketYesterday = (bucket) => {
    switch (bucket) {
        case "short":
            return minutesAgoWithDayOffset(1, randomBetween(15, 59));
        case "medium":
            return minutesAgoWithDayOffset(1, randomBetween(60, 119));
        case "long":
            return minutesAgoWithDayOffset(1, randomBetween(120, 180));
        default:
            throw new Error("Invalid time bucket");
    }
};

/**
 * ─────────────────────────────────────────────
 * Mock collections
 * ─────────────────────────────────────────────
 */

const data = [
    /* ───────────── TODAY ───────────── */

    (() => {
        const checkedInAt = getCheckedInAtByBucket("short");
        return {
            id: "1",
            materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
            customerName: CUSTOMER_NAMES.PEUTE,
            collectionRefNum: "peute-1234",
            lorryRegNum: "pz65pwo",
            checkedInAt,
            checkedOutAt: null,
            currentStatus: COLLECTION_STATUSES.CHECKED_IN,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-001",
                    comments: []
                }
            ]
        };
    })(),

    (() => {
        const checkedInAt = getCheckedInAtByBucket("medium");
        const loadingAt = minutesAgo(40);

        return {
            id: "2",
            materialName: MATERIAL_NAMES.PET_CLEAR,
            customerName: CUSTOMER_NAMES.MRL,
            collectionRefNum: "ab456xy",
            lorryRegNum: "lm12abc",
            checkedInAt,
            checkedOutAt: null,
            currentStatus: COLLECTION_STATUSES.LOADING,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-002",
                    comments: []
                },
                {
                    status: COLLECTION_STATUSES.LOADING,
                    timestamp: loadingAt,
                    updatedByUserId: "flt-1",
                    comments: []
                }
            ]
        };
    })(),

    (() => {
        const checkedInAt = getCheckedInAtByBucket("long");
        const loadingAt = minutesAgo(90);
        const loadedAt = minutesAgo(30);

        return {
            id: "3",
            materialName: MATERIAL_NAMES.HDPE_NATURAL,
            customerName: CUSTOMER_NAMES.VOLKER,
            collectionRefNum: "vl1234",
            lorryRegNum: "qr34def",
            checkedInAt,
            checkedOutAt: null,
            currentStatus: COLLECTION_STATUSES.LOADED,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-001",
                    comments: []
                },
                {
                    status: COLLECTION_STATUSES.LOADING,
                    timestamp: loadingAt,
                    updatedByUserId: "flt-2",
                    comments: []
                },
                {
                    status: COLLECTION_STATUSES.LOADED,
                    timestamp: loadedAt,
                    updatedByUserId: "flt-3",
                    comments: []
                }
            ]
        };
    })(),

    (() => {
        const checkedInAt = minutesAgo(150);
        const checkedOutAt = minutesAgo(20);

        return {
            id: "4",
            materialName: MATERIAL_NAMES.GLASS,
            customerName: CUSTOMER_NAMES.URM,
            collectionRefNum: "gh012ij",
            lorryRegNum: "st56ghi",
            checkedInAt,
            checkedOutAt,
            currentStatus: COLLECTION_STATUSES.CHECKED_OUT,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-002",
                    comments: []
                },
                {
                    status: COLLECTION_STATUSES.CHECKED_OUT,
                    timestamp: checkedOutAt,
                    updatedByUserId: "wb-001",
                    comments: []
                }
            ]
        };
    })(),

    /* ───────────── YESTERDAY ───────────── */

    (() => {
        const checkedInAt = getCheckedInAtByBucketYesterday("short");
        return {
            id: "5",
            materialName: MATERIAL_NAMES.MIXED_PAPER_GR1,
            customerName: CUSTOMER_NAMES.PEUTE,
            collectionRefNum: "y-peute-01",
            lorryRegNum: "aa11bbb",
            checkedInAt,
            checkedOutAt: null,
            currentStatus: COLLECTION_STATUSES.CHECKED_IN,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-003",
                    comments: []
                }
            ]
        };
    })(),

    (() => {
        const checkedInAt = getCheckedInAtByBucketYesterday("medium");
        const loadedAt = minutesAgoWithDayOffset(1, 30);

        return {
            id: "6",
            materialName: MATERIAL_NAMES.PET_CLEAR,
            customerName: CUSTOMER_NAMES.MRL,
            collectionRefNum: "y-mrl-02",
            lorryRegNum: "cc22ddd",
            checkedInAt,
            checkedOutAt: loadedAt,
            currentStatus: COLLECTION_STATUSES.CHECKED_OUT,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-004",
                    comments: []
                },
                {
                    status: COLLECTION_STATUSES.CHECKED_OUT,
                    timestamp: loadedAt,
                    updatedByUserId: "wb-004",
                    comments: []
                }
            ]
        };
    })(),

    (() => {
        const checkedInAt = getCheckedInAtByBucketYesterday("long");
        const loadedAt = minutesAgoWithDayOffset(1, 10);

        return {
            id: "7",
            materialName: MATERIAL_NAMES.HDPE_NATURAL,
            customerName: CUSTOMER_NAMES.VOLKER,
            collectionRefNum: "y-volker-03",
            lorryRegNum: "ee33fff",
            checkedInAt,
            checkedOutAt: loadedAt,
            currentStatus: COLLECTION_STATUSES.CHECKED_OUT,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-005",
                    comments: []
                },
                {
                    status: COLLECTION_STATUSES.CHECKED_OUT,
                    timestamp: loadedAt,
                    updatedByUserId: "wb-005",
                    comments: []
                }
            ]
        };
    })(),

    (() => {
        const checkedInAt = minutesAgoWithDayOffset(1, 180);
        return {
            id: "8",
            materialName: MATERIAL_NAMES.GLASS,
            customerName: CUSTOMER_NAMES.URM,
            collectionRefNum: "y-urm-04",
            lorryRegNum: "gg44hhh",
            checkedInAt,
            checkedOutAt: null,
            currentStatus: COLLECTION_STATUSES.CHECKED_IN,
            statusHistory: [
                {
                    status: COLLECTION_STATUSES.CHECKED_IN,
                    timestamp: checkedInAt,
                    updatedByUserId: "wb-006",
                    comments: []
                }
            ]
        };
    })()
];

export default data;

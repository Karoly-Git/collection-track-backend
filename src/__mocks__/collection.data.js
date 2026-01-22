import COLLECTION_STATUSES from "../constants/collection-statuses.js";
import MATERIAL_NAMES from "../constants/material-names.js";
import CUSTOMER_NAMES from "../constants/customer-names.js";

/**
 * ─────────────────────────────────────────────
 * Time helpers
 * ─────────────────────────────────────────────
 */

const minutesAgo = (minutes) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - minutes);
    return date.toISOString();
};

const minutesAgoWithDayOffset = (daysAgo, minutes) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - daysAgo);
    date.setMinutes(date.getMinutes() - minutes);
    return date.toISOString();
};

const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * ─────────────────────────────────────────────
 * Base pools
 * ─────────────────────────────────────────────
 */

const MATERIAL_POOL = Object.values(MATERIAL_NAMES);
const CUSTOMER_POOL = Object.values(CUSTOMER_NAMES);

/**
 * ─────────────────────────────────────────────
 * Collection factory
 * ─────────────────────────────────────────────
 */

let idCounter = 1;

const createCollection = ({
    status,
    dayOffset = 0 // 0 = today, 1 = yesterday
}) => {
    const timestamp =
        dayOffset === 0
            ? minutesAgo(randomBetween(60, 240))
            : minutesAgoWithDayOffset(dayOffset, randomBetween(60, 240));

    const checkedInAt =
        status === COLLECTION_STATUSES.CHECKED_IN
            ? timestamp
            : null;

    const startedLoadingAt =
        status === COLLECTION_STATUSES.LOADING
            ? timestamp
            : null;

    const finishedLoadingAt =
        status === COLLECTION_STATUSES.LOADED
            ? timestamp
            : null;

    const checkedOutAt =
        status === COLLECTION_STATUSES.CHECKED_OUT
            ? timestamp
            : null;

    const statusHistory = [
        {
            status,
            timestamp,
            updatedByUserId: "wb-001",
            comments: []
        }
    ];

    return {
        id: String(idCounter++),
        materialName:
            MATERIAL_POOL[randomBetween(0, MATERIAL_POOL.length - 1)],
        customerName:
            CUSTOMER_POOL[randomBetween(0, CUSTOMER_POOL.length - 1)],
        collectionRefNum: `ref-${idCounter}-${dayOffset}`,
        lorryRegNum: `lr${randomBetween(10, 99)}abc`,
        checkedInAt,
        startedLoadingAt,
        finishedLoadingAt,
        checkedOutAt,
        currentStatus: status,
        statusHistory
    };
};

/**
 * ─────────────────────────────────────────────
 * Generate data
 * ─────────────────────────────────────────────
 */

const data = [];

// Today + Yesterday
[0, 1].forEach((dayOffset) => {
    Object.values(COLLECTION_STATUSES).forEach((status) => {
        for (let i = 0; i < 3; i++) {
            data.push(
                createCollection({
                    status,
                    dayOffset
                })
            );
        }
    });
});

export default data;

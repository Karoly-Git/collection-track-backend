import COLLECTION_STATUSES from "../constants/collection-statuses.js";
import MATERIAL_NAMES from "../constants/material-names.js";
import CUSTOMER_NAMES from "../constants/customer-names.js";


const data = [
    {
        id: 2,
        materialName: "OCC",
        customerName: "Peute",
        collectionRefNum: "ref-3-0",
        lorryRegNum: "lr96abc",
        checkedInAt: "2026-01 - 21T18: 30: 11.794Z",
        startedLoadingAt: null,
        finishedLoadingAt: null,
        checkedOutAt: null,
        currentStatus: CHECKED_IN,
        statusHistory: [
            {
                status: CHECKED_IN,
                timestamp: "2026-01 - 21T18: 30: 11.794Z",
                updatedByUserId: "wb-001",
                comments: []
            }
        ]
    }
];
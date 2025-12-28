const LORRY_STATUS_ENUM = require("../__mocks__/lorry-status.enum");
const data = require("../__mocks__/lorry.data");

const getAllLorries = (req, res) => {
    try {
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to load data" });
    }
};

const getLorryById = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing lorry id" });
    }

    const lorry = data.find(el => el.lorryId === id);

    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    res.status(200).json(lorry);
};

const getLorryStatusHistory = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing lorry id" });
    }

    const lorry = data.find(el => el.lorryId === id);

    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    res.status(200).json(lorry.statusHistory);
};

const addLorry = (req, res) => {
    const { refNum, registration, updatedBy } = req.body;

    if (
        !refNum ||
        !registration ||
        !updatedBy?.userId ||
        !updatedBy?.name ||
        !updatedBy?.role
    ) {
        return res.status(400).json({
            message: "Missing required body fields",
        });
    }

    const lastId = data.length
        ? parseInt(data[data.length - 1].lorryId, 10) || 0
        : 0;

    const newId = String(lastId + 1);
    const timestamp = new Date().toISOString();

    const newLorry = {
        lorryId: newId,
        refNum,
        registration,
        checkedInAt: timestamp,
        checkedOutAt: null,
        currentStatus: LORRY_STATUS_ENUM.CHECKED_IN,
        statusHistory: [
            {
                status: LORRY_STATUS_ENUM.CHECKED_IN,
                timestamp,
                updatedBy,
            },
        ],
    };

    data.push(newLorry);
    return res.status(201).json(newLorry);
};


const updateLorryStatus = (req, res) => {
    // Read lorry id from URL params
    const { id } = req.params;

    // Read status update payload from request body
    const { status, updatedBy } = req.body;

    // Collect names of any missing required fields
    const missingFields = [];

    // Validate presence of required fields
    if (!id) missingFields.push("id");
    if (!status) missingFields.push("status");
    if (!updatedBy?.userId) missingFields.push("updatedBy.userId");
    if (!updatedBy?.name) missingFields.push("updatedBy.name");
    if (!updatedBy?.role) missingFields.push("updatedBy.role");

    // Reject request if any required fields are missing
    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing required fields: '${missingFields.join(", ")}'`,
        });
    }

    // Ensure status value is a valid enum entry
    if (!Object.values(LORRY_STATUS_ENUM).includes(status)) {
        return res.status(400).json({
            message: "Invalid status value",
        });
    }

    // Look up the lorry by id
    const lorry = data.find(el => el.lorryId === id);

    // Reject if the lorry does not exist
    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    // Prevent applying the same status more than once
    if (
        lorry.currentStatus === status ||
        lorry.statusHistory.some(el => el.status === status)
    ) {
        return res.status(409).json({
            message: `Status '${status}' has already been applied to this lorry`,
        });
    }

    // Create timestamp for the status change
    const timestamp = new Date().toISOString();

    // Update the lorry’s current status
    lorry.currentStatus = status;

    if (status === LORRY_STATUS_ENUM.CHECKED_OUT) {
        lorry.checkedOutAt = timestamp;
    }

    // Append the new status entry to history
    lorry.statusHistory.push({
        status,
        timestamp,
        updatedBy,
    });

    // Return the updated lorry record
    return res.status(200).json(lorry);
};

const deleteLorry = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Missing lorry id",
        });
    }

    const index = data.findIndex(el => el.lorryId === id);

    if (index === -1) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    const deletedLorry = data.splice(index, 1)[0];
    const newData = data.filter(el => el.lorryId !== id);

    //res.status(200).json(deletedLorry);
    res.status(200).json(newData);
};

module.exports = {
    getAllLorries,
    getLorryById,
    getLorryStatusHistory,
    addLorry,
    updateLorryStatus,
    deleteLorry,
};
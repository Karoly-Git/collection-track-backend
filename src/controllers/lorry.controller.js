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
            message: `Lorry with id ${id} not found`,
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
            message: `Lorry with id ${id} not found`,
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
    const { lorryId, status, updatedBy } = req.body;

    //might add a logic on which status can be added depending on the current status: 
    //however, might be handled at the frontend

    // Required fields check
    if (!lorryId || !status || !updatedBy) {
        return res.status(400).json({
            message: "Missing required body fields",
        });
    }

    // Status validation check
    if (!Object.values(LORRY_STATUS_ENUM).includes(status)) {
        return res.status(400).json({
            message: "Invalid status value",
        });
    }

    // Object updatedBy validation
    const { userId, name, role } = updatedBy;

    if (!userId || !name || !role) {
        return res.status(400).json({
            message: "The object of 'updatedBy' must include userId, name, and role",
        });
    }

    // Find lorry
    const lorry = data.find(el => el.lorryId === lorryId);

    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id ${lorryId} not found`,
        });
    }

    // Duplicated status check
    if (lorry.statusHistory.some(el => el.status === status)) {
        return res.status(409).json({
            message: `Status '${status}' already exists in the lorry history`,
        });
    }

    // Update status
    const timestamp = new Date().toISOString();

    lorry.currentStatus = status;
    lorry.statusHistory.push({
        status,
        timestamp,
        updatedBy
    });

    // Send respond
    res.status(200).json(data);
    //res.status(200).json(lorry);
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
            message: `Lorry with id ${id} not found`,
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
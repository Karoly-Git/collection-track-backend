const { request } = require("../../app");
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
    const { lorryId, refNum, registration, updatedBy } = req.body;

    if (!lorryId || !refNum || !registration) { // todo: need to add if all values are present in teh updatedBy object
        return res.status(400).json({
            message: "Missing required body fields",
        });
    }

    const exists = data.find(el => el.lorryId === lorryId);

    if (exists) {
        return res.status(409).json({
            message: `Lorry with id ${lorryId} already exists`,
        });
    }

    const timestamp = new Date().toISOString();

    const newLorry = {
        lorryId,
        refNum,
        registration,
        checkedInAt: timestamp,
        checkedOutAt: null,
        currentStatus: "CHECKED_IN",
        statusHistory: [
            {
                status: "CHECKED_IN",
                timestamp,
                updatedBy
            }
        ]
    };

    data.push(newLorry); // this is where it will be saved in the database

    //res.status(201).json(data);
    res.status(201).json(newLorry);
};


const updateLorryStatus = (req, res) => {
    const { lorryId, status, updatedBy } = req.body;

    const ALLOWED_STATUSES = [
        "CHECKED_IN",
        "LOADING",
        "LOADED",
        "CHECKED_OUT"
    ];

    //might add a logic on which status can be added depending on the current status: 
    //however, might be handled at the frontend

    // Required fields check
    if (!lorryId || !status || !updatedBy) {
        return res.status(400).json({
            message: "Missing required body fields",
        });
    }

    // Status validation
    if (!ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({
            message: "Invalid status value",
        });
    }

    // UpdatedBy validation
    const { userId, name, role } = updatedBy;

    if (!userId || !name || !role) {
        return res.status(400).json({
            message: "updatedBy must include userId, name, and role",
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

    //Respond with updated lorry
    res.status(200).json(data);
    //res.status(200).json(lorry);
};

module.exports = { getAllLorries, getLorryById, getLorryStatusHistory, addLorry, updateLorryStatus };
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

    if (!lorryId || !refNum || !registration) {
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


module.exports = { getAllLorries, getLorryById, getLorryStatusHistory, addLorry };
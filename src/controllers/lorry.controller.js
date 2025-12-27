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

// const addLorry = (req, res) => {
//     return null;
// };


module.exports = { getAllLorries, getLorryById };
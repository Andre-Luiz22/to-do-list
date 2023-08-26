const validateFieldName = (req, res, next) => {
    const { body } = req;
    if (body.name === undefined) {
        return res.status(400).json({ message: "The field name is required" });
    } else if (body.name === "") {
        return res.status(400).json({ message: "name connot be empty" });
    }

    next();
};

const validateFieldStatus = (req, res, next) => {
    const { body } = req;
    if (body.status === undefined) {
        return res
            .status(400)
            .json({ message: "The field status is required" });
    } else if (body.status === "") {
        return res.status(400).json({ message: "status connot be empty" });
    }

    next();
};

export const taskMiddleware = { validateFieldName, validateFieldStatus };

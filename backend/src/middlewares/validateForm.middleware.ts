import { body } from "express-validator";

export const validateFormMiddleware = [
    body("title")
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 3 })
        .withMessage("title should be of minimum 3 characters length")
        .isLength({ max: 80 })
        .withMessage("title should be of maximum 80 characters length"),
    body("description")
        .notEmpty()
        .withMessage("description is required")
        .isLength({ min: 3 })
        .withMessage("description must be at least 3 characters")
        .isLength({ max: 300 })
        .withMessage("description must be at max 300 characters"),
];

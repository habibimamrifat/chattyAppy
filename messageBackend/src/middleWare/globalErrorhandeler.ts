import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Set default status code and message
    const statusCode = error.statusCode || 500
    const status = error.status || "error"
    const message = error.message || "Something went wrong!";

    // Log the error for debugging purposes (optional in production)
    console.error("Global Error:", error);

    // Send error response
    res.status(statusCode).json({
        status,
        message,
        error // Optionally include additional error details
    });
};

export default globalErrorHandler;
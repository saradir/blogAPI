export function errorHandler(err, req, res, next){
    console.error(err);

    // Prisma "record not found"
    if(err.code === "P2025"){
        return res.status(404).json({
            success: false,
            error: {message: "Resource not found"}
        });
    }

    if(err.code === "P2002"){
    return res.status(409).json({
        success: false,
        error: {message: "Invalid input"}
    });
}

    return res.status(500).json({
        success: false,
        error: {message: "Internal server error"}
    });
}
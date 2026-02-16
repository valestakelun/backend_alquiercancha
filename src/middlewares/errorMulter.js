const errorMulter = (err, _req, res, next) => {
    if(err && err.code === 'LIMIT_FILE_SIZE'){
        return res.status(400).json({mensaje: 'La imagen no puede superar los 2MB'})
    }
    next()
};

export default errorMulter
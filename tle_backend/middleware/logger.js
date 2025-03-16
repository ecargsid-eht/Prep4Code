import colors from 'colors';
const logger = (req, res, next) => {
    const methodColors = {
        GET:'green',
        POST:'blue',
        PUT:'yellow',
        DELETE:'red',
    }
    const color = methodColors[req.method] || 'white'
    next();
}
export default logger;
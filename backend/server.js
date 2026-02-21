require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to MongoDB
connectDB();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// To prevent crashes before you write your docs, we'll wrap the swagger setup in a try-catch
try {
    const spec = YAML.load(path.join(__dirname, 'openapi.yaml'));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
} catch (error) {
    console.log("Swagger docs not loaded. Create openapi.yaml to enable /docs.");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});
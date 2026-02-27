import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Using SQLite to ensure it works instantly without MySQL credential configuration
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'cyberforum.sqlite'),
    logging: false, // Turn off SQL logging for cleaner terminal output
});

export default sequelize;

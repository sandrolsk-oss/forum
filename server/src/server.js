import app from './app.js';
import sequelize from './config/database.js';
import { User } from './models/index.js'; // Ensure models are loaded and associated
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT || 5001;

const init = async () => {
    try {
        // Authenticate with SQLite database
        await sequelize.authenticate();
        console.log('[SYS_OK] Connection to Node Matrix Database established.');

        // Sync models
        await sequelize.sync({ alter: true });
        console.log('[SYS_OK] Database models synchronized.');

        // Seed initial admin if missing
        const adminExists = await User.findOne({ where: { nickname: 'admin' } });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Admin#23*', 10);
            await User.create({
                nickname: 'admin',
                email: 'admin@cyberforum.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('[SYS_OK] Master Admin node seeded.');
        }

        app.listen(PORT, () => {
            console.log(`[SYS_OK] Cyberpunk API Terminal running on port ${PORT}`);
        });
    } catch (error) {
        console.error('[SYS_ERR] Unable to connect to database:', error);
    }
};

init();

/**
 * In-memory storage for data (temporary solution).
 */
export default class Dialog_Back_Mod_User {
    /**
     * @param {Dialog_Back_Store_Mem_User} store - in-memory user store instance
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     */
    constructor(
        {
            Dialog_Back_Store_Mem_User$: store,
            TeqFw_Core_Shared_Api_Logger$$: logger
        }
    ) {
        /**
         * Create a new user
         * @param {Object} params - User data
         * @param {number} params.id - Telegram user ID
         * @param {string} params.username - Telegram username
         * @param {string} params.role - User role in the application (Customer | Vendor)
         * @returns {Dialog_Back_Dto_User.Dto} - Created user DTO
         */
        this.create = async function ({id, username, role}) {
            try {
                // Create new user in the in-memory store
                const user = store.create({id, username, role});
                logger.info(`User ${username} created successfully.`);
                return user;
            } catch (error) {
                logger.error(`Error creating user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read user data by ID
         * @param {number} id - User ID
         * @returns {Dialog_Back_Dto_User.Dto|null} - User DTO or null if not found
         */
        this.read = async function ({id}) {
            try {
                const user = store.read(id);
                if (user) {
                    return user;
                } else {
                    logger.info(`User with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                logger.error(`Error reading user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Update user data by ID
         * @param {Object} params - User data
         * @param {number} params.id - User ID
         * @param {string} [params.username] - New Telegram username (optional)
         * @param {string} [params.role] - New user role (optional)
         * @returns {Dialog_Back_Dto_User.Dto|null} - Updated user DTO or null if not found
         */
        this.update = async function ({id, username, role}) {
            try {
                const user = store.update({id, username, role});
                if (user) {
                    logger.info(`User ${id} updated successfully.`);
                    return user;
                } else {
                    logger.info(`User with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                logger.error(`Error updating user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Delete user by ID
         * @param {number} id - User ID
         * @returns {Dialog_Back_Dto_User.Dto|null} - Deleted user DTO or null if not found
         */
        this.delete = async function ({id}) {
            try {
                const user = store.delete(id);
                if (user) {
                    logger.info(`User ${user.id} deleted successfully.`);
                    return user;
                } else {
                    logger.info(`User with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                logger.error(`Error deleting user: ${error.message}`);
                throw error;
            }
        };

        /**
         * List all users
         * @returns {Array<Dialog_Back_Dto_User.Dto>} - List of all user DTOs
         */
        this.list = async function () {
            try {
                return store.list();
            } catch (error) {
                logger.error(`Error listing users: ${error.message}`);
                throw error;
            }
        };

        /**
         * Handle /start command to create or update a user
         * @param {Object} params - User data
         * @param {number} [params.id] - User ID (optional)
         * @param {string} params.username - Telegram username
         * @param {string} params.role - User role (Customer | Vendor)
         * @returns {Object} - Created or updated user DTO
         */
        this.handleStartCommand = async function ({id, username, role}) {
            try {
                let user;
                if (id) {
                    // Read user by ID
                    user = await this.read({id});
                    if (user) {
                        // Update existing user
                        user = await this.update({id, username, role});
                    } else {
                        // If user not found, create a new one
                        user = await this.create({id, username, role});
                    }
                } else {
                    // Create a new user
                    user = await this.create({id, username, role});
                }
                return user;
            } catch (error) {
                logger.error(`Error handling /start command: ${error.message}`);
                throw error;
            }
        };
    }
}

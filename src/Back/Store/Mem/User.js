/**
 * In-memory data store for managing user information.
 * This class provides basic CRUD operations to manipulate
 * user data in memory, without persistence to a database.
 * It simulates a simple user repository using an array
 * to store user records.
 */
export default class Dialog_Back_Store_Mem_User {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Dialog_Back_Dto_User} dtoUser
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Dto_User$: dtoUser
        }
    ) {
        this.users = [];

        /**
         * Create a new user in memory
         * @param {Object} params - The data for the new user
         * @param {number} params.id - Telegram user ID
         * @param {string} params.username - Telegram username
         * @param {string} params.role - Role of the user in the application (Customer | Vendor)
         * @returns {Dialog_Back_Dto_User.Dto} - Created user DTO
         */
        this.create = function ({id, username, role}) {
            try {
                // Create a new DTO for the user
                const userDto = dtoUser.createDto({id, username, role});

                // Add user DTO to the in-memory store
                this.users.push(userDto);

                logger.info(`User ${username} created successfully.`);
                return userDto;
            } catch (error) {
                logger.error(`Error creating user: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read user data by ID
         * @param {number} id - The ID of the user to retrieve
         * @returns {Dialog_Back_Dto_User.Dto|null} - User DTO or null if not found
         */
        this.read = function (id) {
            const user = this.users.find(user => user.id === id);
            return user || null;
        };

        /**
         * Update user data by ID
         * @param {Object} params - Data for updating the user
         * @param {number} params.id - User ID
         * @param {string} [params.username] - New Telegram username (optional)
         * @param {string} [params.role] - New user role (optional)
         * @returns {Dialog_Back_Dto_User.Dto|null} - Updated user DTO or null if not found
         */
        this.update = function ({id, username, role}) {
            const user = this.read(id);
            if (user) {
                if (username) user.username = username;
                if (role) user.role = role;
                logger.info(`User ${id} updated successfully.`);
                return user;
            }
            logger.info(`User with ID ${id} not found.`);
            return null;
        };

        /**
         * Delete user by ID
         * @param {number} id - The ID of the user to delete
         * @returns {Object|null} - Deleted user DTO or null if not found
         */
        this.delete = function (id) {
            const userIndex = this.users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                const deletedUser = this.users.splice(userIndex, 1)[0];
                logger.info(`User ${deletedUser.id} deleted successfully.`);
                return deletedUser;
            }
            logger.info(`User with ID ${id} not found.`);
            return null;
        };

        /**
         * List all users
         * @returns {Array<Dialog_Back_Dto_User.Dto>} - List of all user DTOs
         */
        this.list = function () {
            return this.users;
        };
    }
}

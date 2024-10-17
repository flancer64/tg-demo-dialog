/**
 * The model for Service to manipulate with data in storages.
 */
export default class Dialog_Back_Mod_Service {
    /**
     * @param {Dialog_Back_Store_Mem_Service} store - in-memory service store instance
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     */
    constructor(
        {
            Dialog_Back_Store_Mem_Service$: store,
            TeqFw_Core_Shared_Api_Logger$$: logger
        }
    ) {
        /**
         * Create a new service
         * @param {Object} params - Service data
         * @param {number} params.id - Service ID
         * @param {string} params.name - Name of the service
         * @param {string} params.description - Description of the service
         * @param {number} params.duration - Duration of the service (in minutes)
         * @param {string} params.address - Address where the service is provided
         * @param {number} params.vendorId - ID of the vendor who created the service
         * @returns {Dialog_Back_Dto_Service.Dto} - Created service DTO
         */
        this.create = async function ({id, name, description, duration, address, vendorId}) {
            try {
                // Create new service in the in-memory store
                const service = store.create({id, name, description, duration, address, vendorId});
                logger.info(`Service ${name} created successfully.`);
                return service;
            } catch (error) {
                logger.error(`Error creating service: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read service data by ID
         * @param {number} id - Service ID
         * @returns {Dialog_Back_Dto_Service.Dto|null} - Service DTO or null if not found
         */
        this.read = async function ({id}) {
            try {
                const service = store.read(id);
                if (service) {
                    return service;
                } else {
                    logger.info(`Service with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                logger.error(`Error reading service: ${error.message}`);
                throw error;
            }
        };

        /**
         * Update service data by ID
         * @param {Object} params - Service data
         * @param {number} params.id - Service ID
         * @param {string} [params.name] - New service name (optional)
         * @param {string} [params.description] - New service description (optional)
         * @param {number} [params.duration] - New duration of the service (optional)
         * @param {string} [params.address] - New address (optional)
         * @returns {Dialog_Back_Dto_Service.Dto|null} - Updated service DTO or null if not found
         */
        this.update = async function ({id, name, description, duration, address}) {
            try {
                const service = store.update({id, name, description, duration, address});
                if (service) {
                    logger.info(`Service ${id} updated successfully.`);
                    return service;
                } else {
                    logger.info(`Service with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                logger.error(`Error updating service: ${error.message}`);
                throw error;
            }
        };

        /**
         * Delete service by ID
         * @param {number} id - Service ID
         * @returns {Dialog_Back_Dto_Service.Dto|null} - Deleted service DTO or null if not found
         */
        this.delete = async function ({id}) {
            try {
                const service = store.delete(id);
                if (service) {
                    logger.info(`Service ${service.id} deleted successfully.`);
                    return service;
                } else {
                    logger.info(`Service with ID ${id} not found.`);
                    return null;
                }
            } catch (error) {
                logger.error(`Error deleting service: ${error.message}`);
                throw error;
            }
        };

        /**
         * List all services
         * @returns {Array<Dialog_Back_Dto_Service.Dto>} - List of all service DTOs
         */
        this.list = async function () {
            try {
                return store.list();
            } catch (error) {
                logger.error(`Error listing services: ${error.message}`);
                throw error;
            }
        };

        /**
         * Handle service creation or update
         * @param {Object} params - Service data
         * @param {number} params.id - Service ID
         * @param {string} params.name - Name of the service
         * @param {string} params.description - Description of the service
         * @param {number} params.duration - Duration of the service (in minutes)
         * @param {string} params.address - Address where the service is provided
         * @param {number} params.vendorId - ID of the vendor who created the service
         * @returns {Object} - Created or updated service DTO
         */
        this.handleServiceCommand = async function ({id, name, description, duration, address, vendorId}) {
            try {
                let service = await this.read({id});
                if (service) {
                    // Update existing service
                    service = await this.update({id, name, description, duration, address});
                } else {
                    // If service not found, create a new one
                    service = await this.create({id, name, description, duration, address, vendorId});
                }
                return service;
            } catch (error) {
                logger.error(`Error handling service command: ${error.message}`);
                throw error;
            }
        };
    }
}


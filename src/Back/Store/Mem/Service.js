/**
 * In-memory data store for managing service information.
 * This class provides basic CRUD operations to manipulate
 * service data in memory, without persistence to a database.
 * It simulates a simple service repository using an array
 * to store service records.
 */
export default class Dialog_Back_Store_Mem_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Dialog_Back_Dto_Service} dtoService
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Dialog_Back_Dto_Service$: dtoService
        }
    ) {
        this.services = [];

        /**
         * Create a new service in memory
         * @param {Object} params - The data for the new service
         * @param {number} params.id - Service ID
         * @param {string} params.name - Name of the service
         * @param {string} params.description - Description of the service
         * @param {number} params.duration - Duration of the service (in minutes)
         * @param {string} params.address - Address where the service is provided
         * @param {number} params.vendorId - ID of the vendor who provides the service
         * @returns {Dialog_Back_Dto_Service.Dto} - Created service DTO
         */
        this.create = function ({id, name, description, duration, address, vendorId}) {
            try {
                // Create a new DTO for the service
                const serviceDto = dtoService.createDto({id, name, description, duration, address, vendorId});

                // Add service DTO to the in-memory store
                this.services.push(serviceDto);

                logger.info(`Service ${name} created successfully.`);
                return serviceDto;
            } catch (error) {
                logger.error(`Error creating service: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read service data by ID
         * @param {number} id - The ID of the service to retrieve
         * @returns {Dialog_Back_Dto_Service.Dto|null} - Service DTO or null if not found
         */
        this.read = function (id) {
            const service = this.services.find(service => service.id === id);
            return service || null;
        };

        /**
         * Update service data by ID
         * @param {Object} params - Data for updating the service
         * @param {number} params.id - Service ID
         * @param {string} [params.name] - New service name (optional)
         * @param {string} [params.description] - New service description (optional)
         * @param {number} [params.duration] - New duration of the service (optional)
         * @param {string} [params.address] - New address for the service (optional)
         * @returns {Dialog_Back_Dto_Service.Dto|null} - Updated service DTO or null if not found
         */
        this.update = function ({id, name, description, duration, address}) {
            const service = this.read(id);
            if (service) {
                if (name) service.name = name;
                if (description) service.description = description;
                if (duration) service.duration = duration;
                if (address) service.address = address;
                logger.info(`Service ${id} updated successfully.`);
                return service;
            }
            logger.info(`Service with ID ${id} not found.`);
            return null;
        };

        /**
         * Delete service by ID
         * @param {number} id - The ID of the service to delete
         * @returns {Object|null} - Deleted service DTO or null if not found
         */
        this.delete = function (id) {
            const serviceIndex = this.services.findIndex(service => service.id === id);
            if (serviceIndex !== -1) {
                const deletedService = this.services.splice(serviceIndex, 1)[0];
                logger.info(`Service ${deletedService.id} deleted successfully.`);
                return deletedService;
            }
            logger.info(`Service with ID ${id} not found.`);
            return null;
        };

        /**
         * List all services
         * @returns {Array<Dialog_Back_Dto_Service.Dto>} - List of all service DTOs
         */
        this.list = function () {
            return this.services;
        };
    }
}


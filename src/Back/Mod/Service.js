/**
 * The model for Service to manipulate with data in storages.
 * @implements TeqFw_Core_Shared_Api_Model
 */
export default class Dialog_Back_Mod_Service {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Dialog_Back_Dto_Service} dtoService
     * @param {Dialog_Back_Convert_Service} convService
     * @param {Dialog_Back_Mod_Service_A_Create} aCreate
     * @param {Dialog_Back_Mod_Service_A_List} aList
     * @param {Dialog_Back_Mod_Service_A_Read} aRead
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Dialog_Back_Dto_Service$: dtoService,
            Dialog_Back_Convert_Service$: convService,
            Dialog_Back_Mod_Service_A_Create$: aCreate,
            Dialog_Back_Mod_Service_A_List$: aList,
            Dialog_Back_Mod_Service_A_Read$: aRead,
        }
    ) {

        /**
         * @type {function(Dialog_Back_Dto_Service.Dto=): Dialog_Back_Dto_Service.Dto}
         */
        this.composeEntity = dtoService.createDto;

        /**
         * @type {function(Dialog_Back_Dto_Service.Dto=): Dialog_Back_Dto_Service.Dto}
         */
        this.composeItem = dtoService.createDto;


        /**
         * Create a new service
         * @param {Object} params
         * @param {Dialog_Back_Dto_Service.Dto} params.dto
         * @returns {Promise<Dialog_Back_Dto_Service.Dto>} - Created service DTO
         */
        this.create = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbService} = convService.share2rdb({service: dto});
                const id = await aCreate.act({trx, dbService});
                {
                    const {dbService} = await aRead.act({trx, id});
                    res = convService.rdb2share({dbService});
                }
                // Create new user in the store
                await trx.commit();
                logger.info(`Service with ID ${id} created successfully.`);
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error creating service: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read service data by ID
         * @param {Object} params
         * @param {number} params.id - Service ID
         * @returns {Promise<Dialog_Back_Dto_Service.Dto>}
         */
        this.read = async function ({id}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbService} = await aRead.act({trx, id});
                await trx.commit();
                if (dbService) {
                    res = convService.rdb2share({dbService});
                    logger.info(`Service ${res.id} read successfully.`);
                } else {
                    logger.info(`Service with ID ${id} not found.`);
                }
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error reading service #${id}: ${error.message}`);
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
         * @returns {Promise<Dialog_Back_Dto_Service.Dto[]>} - List of all service DTOs
         */
        this.list = async function () {
            const res = [];
            const trx = await conn.startTransaction();
            try {
                const {items} = await aList.act({trx});
                await trx.commit();
                for (const dbService of items) {
                    const dto = convService.rdb2share({dbService});
                    res.push(dto);
                }
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error listing services: ${error.message}`);
                throw error;
            }
        };

    }
}


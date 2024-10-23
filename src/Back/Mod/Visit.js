/**
 * The model for Visit to manipulate with data in storages.
 * @implements TeqFw_Core_Shared_Api_Model
 */
export default class Dialog_Back_Mod_Visit {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - logger instance
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Dialog_Back_Dto_Visit} dtoVisit
     * @param {Dialog_Back_Dto_Visit_Item} dtoItem
     * @param {Dialog_Back_Convert_Visit} convVisit
     * @param {Dialog_Back_Mod_Visit_A_Create} aCreate
     * @param {Dialog_Back_Mod_Visit_A_List} aList
     * @param {Dialog_Back_Mod_Visit_A_Read} aRead
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Dialog_Back_Dto_Visit$: dtoVisit,
            Dialog_Back_Dto_Visit_Item$: dtoItem,
            Dialog_Back_Convert_Visit$: convVisit,
            Dialog_Back_Mod_Visit_A_Create$: aCreate,
            Dialog_Back_Mod_Visit_A_List$: aList,
            Dialog_Back_Mod_Visit_A_Read$: aRead,
        }
    ) {

        /**
         * @type {function(Dialog_Back_Dto_Visit.Dto=): Dialog_Back_Dto_Visit.Dto}
         */
        this.composeEntity = dtoVisit.createDto;

        /**
         * @type {function(Dialog_Back_Dto_Visit_Item.Dto=): Dialog_Back_Dto_Visit_Item.Dto}
         */
        this.composeItem = dtoItem.createDto;


        /**
         * Create a new visit to a service
         * @param {Object} params
         * @param {Dialog_Back_Dto_Visit.Dto} params.dto
         * @returns {Promise<Dialog_Back_Dto_Visit.Dto>}
         */
        this.create = async function ({dto}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbVisit} = convVisit.share2rdb({visit: dto});
                const id = await aCreate.act({trx, dbVisit});
                {
                    const {dbService, dbCustomer, dbVendor, dbVisit} = await aRead.act({trx, id});
                    res = convVisit.rdb2share({dbService, dbCustomer, dbVendor, dbVisit});
                }
                // Create new user in the store
                await trx.commit();
                logger.info(`Visit with ID ${id} created successfully.`);
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error creating visit: ${error.message}`);
                throw error;
            }
        };

        /**
         * Read visit data by ID
         * @param {Object} params
         * @param {number} params.id
         * @returns {Promise<Dialog_Back_Dto_Visit.Dto>}
         */
        this.read = async function ({id}) {
            let res;
            const trx = await conn.startTransaction();
            try {
                const {dbVisit, dbCustomer, dbService, dbVendor} = await aRead.act({trx, id});
                await trx.commit();
                if (dbVisit) {
                    res = convVisit.rdb2share({dbVisit, dbCustomer, dbService, dbVendor});
                    logger.info(`Visit ${res.id} read successfully.`);
                } else {
                    logger.info(`Visit with ID ${id} not found.`);
                }
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error reading visit #${id}: ${error.message}`);
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
         * @returns {Dialog_Back_Dto_Visit.Dto|null} - Updated service DTO or null if not found
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
         * @returns {Dialog_Back_Dto_Visit.Dto|null} - Deleted service DTO or null if not found
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
         * List all visits
         * @returns {Promise<Dialog_Back_Dto_Visit_Item.Dto[]>}
         */
        this.list = async function () {
            const res = [];
            const trx = await conn.startTransaction();
            try {
                const {items} = await aList.act({trx});
                await trx.commit();
                res.push(...items);
                return res;
            } catch (error) {
                await trx.rollback();
                logger.error(`Error listing visits: ${error.message}`);
                throw error;
            }
        };

    }
}


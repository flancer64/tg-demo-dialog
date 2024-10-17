/**
 * Create new service in RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_Service_A_Create {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Dialog_Back_Store_RDb_Schema_Service} rdbService
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Dialog_Back_Store_RDb_Schema_Service$: rdbService,
        }
    ) {
        // VARS
        const A_SERVICE = rdbService.getAttributes();

        // MAIN
        /**
         * @param {Object} params - Service data
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {Dialog_Back_Store_RDb_Schema_Service.Dto} params.dbService
         *
         * @return {Promise<number>} - ID of the created service
         */
        this.act = async function ({trx, dbService}) {
            const {[A_SERVICE.ID]: id} = await crud.create(trx, rdbService, dbService);
            return id;
        };
    }
}

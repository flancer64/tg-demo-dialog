/**
 * Read service data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_Service_A_Read {
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
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Dialog_Back_Store_RDb_Schema_Service.Dto} [dbService]
         * @memberof Dialog_Back_Mod_Service_A_Read
         */

        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {number} [params.id] - Service ID
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id}) {
            /** @type {Dialog_Back_Store_RDb_Schema_Service.Dto} */
            const dbService = id ? await crud.readOne(trx, rdbService, id) : null;
            return {dbService};
        };
    }
}

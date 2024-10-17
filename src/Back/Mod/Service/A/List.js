/**
 * Read services list data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_Service_A_List {
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
         * @property {Dialog_Back_Store_RDb_Schema_Service.Dto[]} [items]
         * @memberof Dialog_Back_Mod_Service_A_List
         */

        /**
         * @param {Object} params - Service data
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx}) {
            const items = await crud.readSet(trx, rdbService);
            return {items};
        };
    }
}

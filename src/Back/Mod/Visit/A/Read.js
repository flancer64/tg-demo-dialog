/**
 * Read visit data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_Visit_A_Read {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Dialog_Back_Store_RDb_Schema_Service} rdbService
     * @param {Dialog_Back_Store_RDb_Schema_Visit} rdbVisit
     * @param {Dialog_Back_Store_RDb_Schema_User} rdbUser
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Dialog_Back_Store_RDb_Schema_Service$: rdbService,
            Dialog_Back_Store_RDb_Schema_Visit$: rdbVisit,
            Dialog_Back_Store_RDb_Schema_User$: rdbUser,
        }
    ) {
        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Dialog_Back_Store_RDb_Schema_Service.Dto} [dbService]
         * @property {Dialog_Back_Store_RDb_Schema_User.Dto} [dbCustomer]
         * @property {Dialog_Back_Store_RDb_Schema_User.Dto} [dbVendor]
         * @property {Dialog_Back_Store_RDb_Schema_Visit.Dto} [dbVisit]
         * @memberof Dialog_Back_Mod_Visit_A_Read
         */

        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         * @param {number} [params.id] - Visit ID
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx, id}) {
            /** @type {Dialog_Back_Store_RDb_Schema_Visit.Dto} */
            const dbVisit = id ? await crud.readOne(trx, rdbVisit, id) : null;
            /** @type {Dialog_Back_Store_RDb_Schema_User.Dto} */
            const dbCustomer = dbVisit?.user_ref ? await crud.readOne(trx, rdbUser, dbVisit.user_ref) : null;
            /** @type {Dialog_Back_Store_RDb_Schema_Service.Dto} */
            const dbService = dbVisit?.service_ref ? await crud.readOne(trx, rdbService, dbVisit.service_ref) : null;
            /** @type {Dialog_Back_Store_RDb_Schema_User.Dto} */
            const dbVendor = dbService.user_ref ? await crud.readOne(trx, rdbUser, dbService.user_ref) : null;

            return {dbService, dbCustomer, dbVendor, dbVisit};
        };
    }
}

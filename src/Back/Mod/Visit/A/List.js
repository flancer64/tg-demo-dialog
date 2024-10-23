/**
 * Read visits list data from RDB.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class Dialog_Back_Mod_Visit_A_List {
    /**
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Dialog_Back_Store_RDb_Schema_Visit} rdbVisit
     * @param {Dialog_Back_Mod_Visit_A_List_A_Query} aQuery
     */
    constructor(
        {
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Dialog_Back_Store_RDb_Schema_Visit$: rdbVisit,
            Dialog_Back_Mod_Visit_A_List_A_Query$: aQuery,
        }
    ) {
        // MAIN
        /**
         * The structure of the returned value.
         * @typedef {Object} ActResult
         * @property {Dialog_Back_Dto_Visit_Item.Dto[]} [items]
         * @memberof Dialog_Back_Mod_Visit_A_List
         */

        /**
         * @param {Object} params
         * @param {TeqFw_Db_Back_RDb_ITrans} params.trx
         *
         * @return {Promise<ActResult>}
         */
        this.act = async function ({trx}) {
            const query = aQuery.build(trx);
            /** @type {Dialog_Back_Dto_Visit_Item.Dto[]} */
            const items = await query;
            return {items};
        };
    }
}

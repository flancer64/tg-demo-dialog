/**
 * RDB query builder to select visits.
 * @see Events_Back_Act_User_Create_A_Query (has been copied from)
 */
export default class Dialog_Back_Mod_Visit_A_List_A_Query {
    /**
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Dialog_Back_Store_RDb_Schema_Service} rdbService
     * @param {Dialog_Back_Store_RDb_Schema_User} rdbUser
     * @param {Dialog_Back_Store_RDb_Schema_Visit} rdbVisit
     * @param {Dialog_Back_Dto_Visit_Item} dtoItem
     */
    constructor(
        {
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Dialog_Back_Store_RDb_Schema_Service$: rdbService,
            Dialog_Back_Store_RDb_Schema_User$: rdbUser,
            Dialog_Back_Store_RDb_Schema_Visit$: rdbVisit,
            Dialog_Back_Dto_Visit_Item$: dtoItem,
        }
    ) {
        // VARS
        const knex = conn.getKnex();
        const A_SERVICE = rdbService.getAttributes();
        const A_USER = rdbUser.getAttributes();
        const A_VISIT = rdbVisit.getAttributes();

        /** @type {Object<string, string>} */
        let MAP;

        /**
         * Aliases for the columns in the query.
         * @memberof Dialog_Back_Mod_Visit_A_List_A_Query
         */
        const COL = dtoItem.getAttributes();
        Object.freeze(COL);

        /**
         * Map for tables aliases in the query.
         * @type {Object}
         * @memberOf Dialog_Back_Mod_Visit_A_List_A_Query
         */
        const TBL = {
            SERVICE: 's',
            USER: 'u',
            VISIT: 'v',
        };
        Object.freeze(TBL);

        // FUNCS

        /**
         * Compose and return map for columns in select (fields and expressions).
         * @return {Object<string, string>}
         */
        function getMap() {
            if (!MAP) {
                const knex = conn.getKnex();
                /**
                 * The map associates query columns with 'table.field' pairs.
                 * @type {Object<string, string>}
                 */
                const MAP_FLD = {
                    [COL.DATE_CREATED]: `${TBL.VISIT}.${A_VISIT.DATE_CREATED}`,
                    [COL.DATE_UPDATED]: `${TBL.VISIT}.${A_VISIT.DATE_UPDATED}`,
                    [COL.ID]: `${TBL.VISIT}.${A_VISIT.ID}`,
                    [COL.SERVICE_NAME]: `${TBL.SERVICE}.${A_SERVICE.NAME}`,
                    [COL.SERVICE_REF]: `${TBL.VISIT}.${A_VISIT.SERVICE_REF}`,
                    [COL.STATUS]: `${TBL.VISIT}.${A_VISIT.STATUS}`,
                    [COL.USER_REF]: `${TBL.VISIT}.${A_VISIT.USER_REF}`,
                    [COL.USER_NAME]: knex.raw(`CONCAT(${TBL.USER}.${A_USER.NAME_FIRST}, ' ', ${TBL.USER}.${A_USER.NAME_LAST})`),
                    [COL.DATE_VISIT]: `${TBL.VISIT}.${A_VISIT.DATE_VISIT}`,
                };
                /**
                 * The map associates aggregated query columns with SQL expressions.
                 * @type {Object<string, string>}
                 */
                const MAP_AGG = {};
                MAP = Object.assign({}, MAP_FLD, MAP_AGG);
            }
            return MAP;
        }

        // INSTANCE METHODS
        this.build = function (trx) {
            // VARS
            /* knex related  objects */
            const tService = {[TBL.SERVICE]: trx.getTableName(rdbService)};
            const tUser = {[TBL.USER]: trx.getTableName(rdbUser)};
            const tVisit = {[TBL.VISIT]: trx.getTableName(rdbVisit)};
            // MAIN
            /** @type {Knex.QueryBuilder} */
            const res = trx.createQuery();
            // main table
            res.table(tVisit);
            res.select(getMap());
            // join another table
            res.leftJoin(tUser, `${TBL.USER}.${A_USER.ID}`, `${TBL.VISIT}.${A_VISIT.USER_REF}`);
            // join another table
            res.leftJoin(tService, `${TBL.SERVICE}.${A_SERVICE.ID}`, `${TBL.VISIT}.${A_VISIT.SERVICE_REF}`);
            // order by
            res.orderBy([{column: `${TBL.VISIT}.${A_VISIT.DATE_VISIT}`, order: 'asc'}]);
            return res;
        };

        /**
         * Get query columns (field's aliases).
         * @return {typeof Dialog_Back_Mod_Visit_A_List_A_Query.COL}
         */
        this.getColumns = () => COL;

        /**
         *
         * @returns {typeof Dialog_Back_Mod_Visit_A_List_A_Query.TBL}
         */
        this.getTables = () => TBL;

        /**
         * Map query columns to table.field pairs or expressions.
         * @param {string} col
         */
        this.mapColumn = function (col) {
            const map = getMap();
            return map[col];
        };
    }
}

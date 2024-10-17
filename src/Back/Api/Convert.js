/**
 * The interface for the backend converter for shared data and RDB entities.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class Dialog_Back_Api_Convert {
    /**
     * Convert a set of the RDB entities into a shared entity.
     * @return {{}}
     */
    rdb2share({}) { }

    /**
     * Convert a shared entity into a set of the RDB entities.
     * @param {*} data
     * @return {*}
     */
    share2rdb({data}) { }
}

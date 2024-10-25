export default class Dialog_Back_Bot_Helper_CmdHelp_Info {
    /**
     * @param {Dialog_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            Dialog_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$: logger,
        }
    ) {
        // INSTANCE METHODS
        this.error = function (msg, req, res) {
            modNotify.negative(msg);
        };
    }
}

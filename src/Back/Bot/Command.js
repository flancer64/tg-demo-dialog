/**
 * The codifier for bot commands.
 */
const Dialog_Back_Bot_Command = {
    HELP: 'help',                        // Provides explanation of available commands
    SERVICE_CREATE: 'service_create',    // Vendor creates a new service
    SERVICE_DELETE: 'service_delete',    // Vendor deletes a service
    SERVICE_LIST: 'service_list',        // Client and Vendor view the list of all services
    SERVICE_READ: 'service_read',        // Client and Vendor read information about a service
    SERVICE_UPDATE: 'service_update',    // Vendor updates service information
    SETTINGS: 'settings',                // User settings
    START: 'start',                      // Starts the bot, user role selection
    VISIT_APPROVE: 'visit_approve',      // Vendor approves a client's visit request
    VISIT_DECLINE: 'visit_decline',      // Vendor declines a client's visit request
    VISIT_DELETE: 'visit_delete',        // Client cancels a visit
    VISIT_LIST: 'visit_list',            // Client views their visits, Vendor views all visits to their services
    VISIT_QUEUE: 'visit_queue',          // Vendor views requests for visits
    VISIT_SERVICE: 'visit_service',      // Client registers for a service
};

Object.freeze(Dialog_Back_Bot_Command);
export default Dialog_Back_Bot_Command;

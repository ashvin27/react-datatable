
class SaveState {
    
    constructor (tableId) {
        this.tableId = tableId;
    }

    /**
     * return key for saving state in browser storage
     * 
     * @returns String
     */
    getStatePath () {
        return `${this.tableId}_${location.pathname}`;
    }

    /**
     * State table state data into browser storage
     * @param {Object} stateData 
     */
    save (stateData) {
        let stateKey = this.getStatePath();
        console.log("stateKey", stateKey);
        console.log("stateData", stateData);

        localStorage.setItem(stateKey, JSON.stringify(stateData));
    }

    /**
     * Get table saved state
     * 
     * @return {Object}
     */
    getState () {
        let stateKey = this.getStatePath();
        let stateData = localStorage.getItem(stateKey);
        if(stateData) {
            return JSON.parse(stateData);
        }
    }
}

export default SaveState;
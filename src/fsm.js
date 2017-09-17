class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config)
            throw new Error;
        else
            this.config = config;
            this.activeState = config.initial; 
            this.statesArray = this.getStates();           
            
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.getStates().indexOf(state) !== -1){
            this.activeState = state;
            return true;
        } else {
            throw new Error
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        if (!event) {
            for (var state in this.config.states) {                
                if (this.config.states.hasOwnProperty(state)) {
                    states.push(state);                            
                }
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

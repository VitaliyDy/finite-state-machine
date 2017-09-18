class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config)
            throw new Error("if config doesn\'t passed");
        else
            this.config = config;
            this.activeState = config.initial; 
            this.statesArray = [];
            this.statesArray.push(this.activeState);
            this.stateMarker = 0;
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
            this.statesArray.push(this.activeState);  
            this.stateMarker = 0;            
            this.activeState = state;
            return true;
        } else {
            throw new Error("state doesn\'t exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {       
        if (this.getStates(event).indexOf( this.activeState ) === -1 ){            
            throw new Error("event in current state isn\'t exist");   
        }
        if (this.stateMarker > 0) {
            this.statesArray.length = this.statesArray.length - this.stateMarker;
        }
        for (var state in this.config.states) {                
            if (this.config.states.hasOwnProperty(state)) {
                for (var trigger in this.config.states[state]) {
                    if (this.config.states[state][trigger].hasOwnProperty(event)) {
                        this.activeState = this.config.states[state][trigger][event];
                        this.statesArray.push(this.activeState);
                        this.stateMarker = 0;                        
                        return this.activeState
                    }
                }                              
           } 
        }    

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.config.initial; 
        this.statesArray.length = 0;
        this.stateMarker = 0;
        this.statesArray.push(this.activeState);  
    }

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
        } else {
            for (var state in this.config.states) {                
                if (this.config.states.hasOwnProperty(state)) {
                    for (var trigger in this.config.states[state]) {
                        if (this.config.states[state][trigger].hasOwnProperty(event)) {
                            states.push(state);  
                        }
                    }                              
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
    undo() {
        if(this.statesArray.length === 1) {
            return false;
        }else{
            this.stateMarker++;
            let temp = this.statesArray.length-this.stateMarker-1;
            if (temp >= 0)
                this.activeState=this.statesArray[temp];
            else
                return false;            
        }
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.stateMarker === 0) {
            return false;
        }else{
            this.stateMarker--;
            let temp = this.statesArray.length-this.stateMarker-1;
            this.activeState = this.statesArray[temp];        
        }
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.reset();
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

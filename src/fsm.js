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
            return this.activeState = state;
        } else {
            throw new Error("state doesn\'t exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {       
        for (var state in this.config.states) {                
            if (this.config.states.hasOwnProperty(state)) {
                for (var trigger in this.config.states[state]) {
                    if (this.config.states[state][trigger].hasOwnProperty(event)) {
                        this.activeState = this.config.states[state][trigger][event];
                        this.statesArray.push(this.activeState);                        
                        return this.activeState
                    }
                }                              
           } 
        }
        throw new Error("event in current state isn\'t exist");   
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.config.initial; 
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
        if(this.statesArray.length === 0) {
            return false;
        }
    }

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

    /**
     * Parses config object
     */
     configParser(config, event){
        let statesArray1 = [];
        let triggersArray =[];
        for (var state in config.states) {                
            if (config.states.hasOwnProperty(state)) {
                statesArray1.push(state);     
                //console.log(config.states[state]);
                    for (var trigger in config.states[state]) {  
                        // console.log(trigger);
                        // console.log(config.states[state]);
                        // console.log(config.states[state][trigger]);
                        // console.log("key: " +trigger + "  value:" +config.states[state][trigger] );
                        console.log(config.states[state][trigger][event])
                        for( var smth in config.states[state][trigger]   ){
                           // console.log("key: " +smth + "  value:" +config.states[state][trigger][smth] )

                            triggersArray.push(new Object(smth,config.states[state][trigger][smth]))
                        }
                    }   
                }              
        }
        return triggersArray;
    }

}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

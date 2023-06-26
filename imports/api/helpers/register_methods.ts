import { Meteor } from 'meteor/meteor';
import * as methods from '../methods';

// Helper function to invoke my methods with type guards
export function registerMyMethods() {
    // Iterate over method export
    Object.entries(methods).forEach(([methodName, methodFunc]) => {
        // Register only imported functions
        if (typeof methodFunc === 'function')
            Meteor.methods({ [methodName]: methodFunc })
    })
} 

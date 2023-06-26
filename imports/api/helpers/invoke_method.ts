import { Meteor } from 'meteor/meteor';
import * as methods from '../methods';

// Helper function to invoke my methods with type guards
export function callMyMethod<K extends keyof typeof methods>(
    methodName: K,
    ...methodArgs: Parameters<typeof methods[K]>
): ReturnType<typeof methods[K]> {
    return Meteor.call(methodName, ...methodArgs);
};
import * as _ from 'lodash';
// @ts-ignore
import { Args, ConstantOperation, Operation } from '../interfaces.d.ts';

export default {
  evaluateOperations(operation: Operation, args: Args): boolean | undefined {
    if (operation.type === 'ConstantOperation') return operation.value;
    if (operation.type === 'ArgumentOperation') return args[operation.argname];
    if (operation.type === 'LogicalOperation' && operation.items && operation.items.length) {
      let hasUndefined = false;
      let result;
      switch (operation.operator) {
        case 'and':
          result = _.every(operation.items, (v) => {
            if (v.result === undefined) hasUndefined = true;
            return v.result;
          });
          if (hasUndefined) break;
          else return result;
        case 'or':
          result = _.some(operation.items, (v) => {
            if (v.result === undefined) hasUndefined = true;
            return v.result;
          });
          if (hasUndefined) break;
          else return result;
        default:
          return result;
      }
    }
    return undefined;
  },
};

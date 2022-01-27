import { useState } from 'react';
// @ts-ignore
import { Args, Operation } from '../interfaces.d.ts';

export interface IAddArg {
  name: string,
  value: boolean
}

export interface ILogicalOperations {
  args: Args,
  operation: Operation,
  setOperation: () => void,
  addArg: () => boolean,
  clearArgs: () => void,
  updateArg: () => boolean,
  updateOperation: () => void,
  result: boolean
}

export interface UpdateOperationProps {
  type: string,
  argname?: string,
  operator?: string,
  result: boolean,
  items?: Operation<any>[],
  value?: boolean,
}

function useLogicalOperations() {
  const [args, setArgs] = useState<Args>({});
  const [operation, setOperation] = useState<Operation>(new Operation());

  const clearArgs = () => {
    setArgs({});
  };

  const addArg = ({
    name,
    value,
  }: IAddArg) => {
    const argsKeys: string[] = Object.keys(args);

    /*
     Early return if argument already exists
     */

    if (argsKeys.includes(name)) return false;

    const tempArgs = { ...args };
    tempArgs[name] = value;

    setArgs(tempArgs);

    /*
    Argument added
     */
    return true;
  };

  const updateArg = ({
    name,
    value,
  }: IAddArg) => {
    const argsKeys: string[] = Object.keys(args);

    /*
     Early return if argument does not exist
     */

    if (!argsKeys.includes(name)) return false;

    const tempArgs = { ...args };
    tempArgs[name] = value;

    setArgs(tempArgs);

    /*
    Argument updated
     */
    return true;
  };

  const updateOperation = ({
    type,
    argname,
    operator,
    result,
    items,
    value = true,
  }: UpdateOperationProps) => {
    const obj: {
      type: string,
      value?: boolean,
      operator?: string, argname?: string, result?: boolean,
      items?: Operation<any>
    } = { type, result };

    if (type === 'ConstantOperation') {
      obj.value = value;
      obj.result = value;
    } else if (type === 'LogicalOperation') {
      obj.operator = operator;
      obj.result = result;
      obj.items = items;
    } else if (type === 'ArgumentOperation') {
      obj.argname = argname;
    }
    setOperation(obj);
  };

  return {
    args,
    operation,
    setOperation,
    addArg,
    clearArgs,
    updateArg,
    updateOperation,
    result: operation.result,
  } as ILogicalOperations;
}

export default useLogicalOperations;

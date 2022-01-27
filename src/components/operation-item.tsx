import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button, Select, CloseButton, Box,
} from '@chakra-ui/react';
import styles from './operation-item.module.css';

import {
  Operation, ConstantOperation, ArgumentOperation, LogicalOperation, Args,
  // @ts-ignore
} from '../interfaces.d.ts';
// @ts-ignore
import evaluation from '../utils/evaluation.ts';

export interface OperationItemProps {
  args: Args;
  item: Operation<any>;
  updateOperation: (v: Operation<any>, k?: number, argname?: string) => void;
  depth?: number;
  index?: number;
}

export function OperationItem({
  args,
  item,
  updateOperation,
  depth = 0,
  index,
}: OperationItemProps): React.ReactElement {
  const evaluate = () => evaluation.evaluateOperations(item, args);

  const [argsState, setArgsState] = useState<Args>({});
  const [itemState, setItemState] = useState<unknown[]>([]);

  const onTypeChange = (evt: ChangeEvent) => {
    if (evt && evt.target && 'value' in evt.target) {
      const val = (evt.target as { value: string }).value;
      let op;
      switch (val) {
        case 'constant':
          op = new Operation(ConstantOperation);

          updateOperation({
            ...op,
            value: op.item.value,
            result: op.item.result,
          });
          return;
        case 'argument':
          updateOperation(new Operation(ArgumentOperation));
          return;
        case 'or':
        case 'and':
          updateOperation({
            type: 'LogicalOperation',
            operator: val,
            result: evaluate(),
            items: [{
              key: 0,
              type: null,
            }, {
              key: 1,
              type: null,
            }],
          });
          return;
        default:
          updateOperation(null, depth);
      }
    }
  };

  const onConstantChange = (evt: ChangeEvent) => {
    if (evt && evt.target && 'value' in evt.target) {
      const val = (evt.target as { value: string }).value === 'true';
      updateOperation({
        type: 'ConstantOperation',
        result: val,
        value: val,
      }, index);
    }
  };

  const onArgumentChange = (evt: ChangeEvent) => {
    if (evt && evt.target && 'value' in evt.target) {
      const val = (evt.target as { value: string }).value;
      updateOperation({
        type: 'ArgumentOperation',
        result: typeof args[val] === 'string' ? args[val] === 'true' : args[val],
        argname: val,
      }, index);
    }
  };

  useEffect(() => {
    if (JSON.stringify(args) !== JSON.stringify(argsState)
      || JSON.stringify(item.items) !== JSON.stringify(itemState)) {
      setArgsState(args);
      if (item.type === 'LogicalOperation'
        && typeof item.operator !== 'undefined'
        && typeof item.items !== 'undefined') {
        setItemState(Array.from(item.items));

        updateOperation({
          type: 'LogicalOperation',
          items: item.items,
          operator: item.operator,
          result: evaluate(),
        }, index);
      } else if (item.type === 'ArgumentOperation'
        && typeof item.argname !== 'undefined'
        && args[item.argname] !== item.result) {
        updateOperation({
          type: 'ArgumentOperation',
          argname: item.argname,
          result: args[item.argname],
        }, index);
      }
    }
  }, [args, item]);

  const displayTypeSelect = !item.type || item.type === 'LogicalOperation';
  const displayConstantSelect = item.type === 'ConstantOperation';
  const displayArgSelect = item.type === 'ArgumentOperation';

  const updateOperationFn = (v: Operation<any>, key?: number) => {
    const temp = { ...item };
    if (typeof key !== 'undefined') {
      temp.items[key] = {
        ...v,
        key,
        value: v.value,
      };

      if (depth) {
        updateOperation(item, key);
      } else {
        updateOperation(item);
      }
    }
  };

  const addOperation = () => {
    const temp = { ...item };
    temp.items.push({
      type: null,
      index: temp.items.length,
    });

    if (depth) {
      updateOperation(item, index);
    } else {
      updateOperation(item);
    }
  };

  const typeCond = ('operator' in item ? item.operator : item.type || 0);
  const typeSelectValue = item.type ? typeCond : 0;
  const argumentSelectValue = item.type && 'argname' in item && typeof item.argname !== 'undefined' ? item.argname : 0;

  return (
    <div className={styles.operation_wrapper}>
      <Box style={{ marginLeft: `${depth * 40}px` }} className={styles.item_wrapper}>
        {displayTypeSelect
          && (
            <Select
              bg="#fff"
              ml={4}
              mr={4}
              onChange={onTypeChange}
              value={typeSelectValue}
            >
              <option value={0} disabled>select...</option>
              <option value="constant">constant</option>
              <option value="argument">argument</option>
              <option value="and">and</option>
              <option value="or">or</option>
            </Select>
          )}

        {displayConstantSelect
          && (
            <Select
              bg="#fff"
              ml={4}
              mr={4}
              onChange={onConstantChange}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </Select>
          )}

        {!!(displayArgSelect && Object.keys(args).length)
          && (
            <Select
              bg="#fff"
              ml={4}
              mr={4}
              onChange={onArgumentChange}
              value={argumentSelectValue}
            >
              <option value={0} disabled>select argument...</option>
              {Object.keys(args)
                .map((v, i) => (
                  <option value={v} key={v}>
                    [
                    {args[v].toString()}
                    ]
                    {' '}
                    {v}
                  </option>
                ))}
            </Select>
          )}

        {(displayArgSelect && (!Object.keys(args).length))
          && (<div className={styles.info_msg}>No arguments added</div>)}

        {item.type
          && <CloseButton onClick={() => updateOperation({ type: null }, depth)} />}
      </Box>
      {'items' in item
        && (
          item.items.map((v: { key: number }, i: number) => (
            <OperationItem
              key={`${depth}_${index}_${v.key}`}
              depth={depth + 1}
              index={i}
              item={v}
              updateOperation={(op) => updateOperationFn(op, i)}
              args={args}
            />
          ))
        )}

      {'items' in item
        && (
          <Button mb={4} style={{ marginLeft: `${depth * 40 + 56}px` }} onClick={addOperation}>
            Add
            op
          </Button>
        )}
    </div>
  );
}

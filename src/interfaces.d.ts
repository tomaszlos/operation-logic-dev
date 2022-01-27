export interface Args {
  [argname: string]: boolean;
}

type OperationType =
  'ArgumentOperation' | 'ConstantOperation' | 'LogicalOperation' | null

export interface IOperation {
  type: keyof OperationType;
  items?: [keyof OperationType][] | [keyof OperationType];
  result: boolean | undefined;
}

export interface ILogicalOperation {
  operator: string;
  result?: boolean;
}

export class Operation<T extends IOperation> {
  private readonly type;

  private readonly item;

  constructor(public readonly OperationClass: new () => T | null = null) {
    if (OperationClass) {
      this.item = typeof OperationClass === 'function' ? new OperationClass() : OperationClass;
      this.type = typeof OperationClass === 'function' ? OperationClass.name : 'LogicalOperation';
    } else this.type = null;
  }
}

export class ArgumentOperation {
  private argname = null;
}

export class ConstantOperation {
  private value = true;

  private result = true;
}

export class LogicalOperation {
  private operator;

  private items = [];

  constructor(op): ILogicalOperation {
    this.operator = op;
    this.items = [];
  }
}

/**
 * @generated SignedSource<<7f217b6e3533f29be44a4bdabf0200f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAccountInput = {
  email: string;
  name: string;
  password: string;
};
export type registerMutation$variables = {
  input: CreateAccountInput;
};
export type registerMutation$data = {
  readonly createAccount: {
    readonly id: string;
    readonly createdAt: any;
  };
};
export type registerMutation = {
  variables: registerMutation$variables;
  response: registerMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "createAccountInput",
        "variableName": "input"
      }
    ],
    "concreteType": "Auth",
    "kind": "LinkedField",
    "name": "createAccount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "registerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "registerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2e4f00017e999af3deb77ff43a7f3e5a",
    "id": null,
    "metadata": {},
    "name": "registerMutation",
    "operationKind": "mutation",
    "text": "mutation registerMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(createAccountInput: $input) {\n    id\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "caad26b06162ef816b80990639d483c2";

export default node;

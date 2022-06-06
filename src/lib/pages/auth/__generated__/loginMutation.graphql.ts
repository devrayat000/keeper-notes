/**
 * @generated SignedSource<<1d16366caf787358c872641beed49e81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DisplayMode = "LIST" | "GRID" | "%future added value";
export type LoginInput = {
  email: string;
  password: string;
};
export type loginMutation$variables = {
  input: LoginInput;
};
export type loginMutation$data = {
  readonly login: {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly displayMode: DisplayMode;
    readonly darkMode: boolean;
  };
};
export type loginMutation = {
  variables: loginMutation$variables;
  response: loginMutation$data;
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
        "name": "loginInput",
        "variableName": "input"
      }
    ],
    "concreteType": "Auth",
    "kind": "LinkedField",
    "name": "login",
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
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "displayMode",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "darkMode",
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
    "name": "loginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "loginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b1889314b5294845deb3b3d0ac7082a",
    "id": null,
    "metadata": {},
    "name": "loginMutation",
    "operationKind": "mutation",
    "text": "mutation loginMutation(\n  $input: LoginInput!\n) {\n  login(loginInput: $input) {\n    id\n    email\n    name\n    displayMode\n    darkMode\n  }\n}\n"
  }
};
})();

(node as any).hash = "86b1b5655e3029a448eac4455ea1e1e8";

export default node;

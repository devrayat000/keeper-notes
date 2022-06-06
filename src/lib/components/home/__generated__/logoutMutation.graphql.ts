/**
 * @generated SignedSource<<20532fb0e930955967bbafa276060a89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type logoutMutation$variables = {};
export type logoutMutation$data = {
  readonly logout: {
    readonly id: string;
  };
};
export type logoutMutation = {
  variables: logoutMutation$variables;
  response: logoutMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Auth",
    "kind": "LinkedField",
    "name": "logout",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "logoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "logoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6676437ee4f5c28b5d57a76b212a615b",
    "id": null,
    "metadata": {},
    "name": "logoutMutation",
    "operationKind": "mutation",
    "text": "mutation logoutMutation {\n  logout {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4ceaf0bfbb275fb214660fb8b6b78aa4";

export default node;

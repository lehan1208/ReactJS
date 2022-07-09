import EventEmitter from "events";
import _ from "lodash";

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimited listener

export const emitter = _emitter;

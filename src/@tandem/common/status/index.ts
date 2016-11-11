
import { serializable, serialize, deserialize } from "../serialize";

@serializable({
  serialize({ type, data }: Status) {
    return { type, data: serialize(data) };
  },
  deserialize({ type, data }, injector): Status {
    return new Status(type, deserialize(data, injector));
  }
})
export class Status {
  static readonly IDLE: string = "idle";
  static readonly ERROR: string = "error";
  static readonly LOADING: string = "loading";
  static readonly COMPLETED: string = "completed";
  constructor(readonly type: string, readonly data?: any) { }
}

import * as sift from "sift";
import { inject } from "@tandem/common/decorators";
import { IStreamableDispatcher, IBus, DuplexStream } from "@tandem/mesh";
import * as mongoid from "mongoid-js";
import { IDisposable } from "@tandem/common/object";
import { ISerializable } from "@tandem/common/serialize";
import { IBrokerBus } from "@tandem/common/dispatchers";
import { Observable, IObservable } from "@tandem/common/observable";
import { CallbackDispatcher, ParallelBus, readOneChunk, DSFind, DSInsert, DSUpdate, DSRemove, IMessage } from "@tandem/mesh";
import { Injector, PrivateBusProvider, IInjectable } from "@tandem/common/ioc";
import {
  Action,
  DSAction,
  PostDSAction,
  DisposeAction,
  ActiveRecordAction,
} from "@tandem/common/actions";


export interface IActiveRecord<T> extends IObservable, IInjectable, IDisposable, ISerializable<T> {
  collectionName: string;
  idProperty: string;
  save();
  insert();
  remove();
  update();

  /**
   * @deprecated
   */

  serialize();
  deserialize(value: any);
}

// TODO - need to queue actions
// TODO - add schema here

export abstract class BaseActiveRecord<T> extends Observable implements IActiveRecord<T> {

  @inject(PrivateBusProvider.ID)
  protected dispatcher: IStreamableDispatcher<any>;

  // TODO - move this to reflect metadata
  readonly idProperty: string = "_id";

  constructor(private _source: T, readonly collectionName: string) {
    super();
    if (this._source) {
      this.setPropertiesFromSource(_source);
    }
  }

  get isNew() {
    return this[this.idProperty] == null;
  }

  get source() {
    return this._source;
  }

  /**
   * Refreshes the active record from the DS if the source data
   * is stale.
   */

  refresh() {
    return this.fetch(new DSFind(this.collectionName, this.sourceQuery));
  }

  save() {
    return this.isNew ? this.insert() : this.update();
  }

  dispose() {
    this.notify(new DisposeAction());
  }

  insert() {
    this.willSave();
    const newData = this.serialize();
    if (newData[this.idProperty] == null) {
      newData[this.idProperty] = String(mongoid());
      // console.error(newData, this);
    }
    return this.fetch(new DSInsert(this.collectionName, newData));
  }

  remove() {
    return this.fetch(new DSRemove(this.collectionName, this.sourceQuery));
  }

  protected get sourceQuery() {
    if (this.isNew) {
      throw new Error("Cannot query active record if it does not have an identifier.");
    };

    const id = this[this.idProperty];
    return {
      [this.idProperty]: id
    };
  }

  protected shouldUpdate() {
    return true;
  }

  /**
   * Called immediately before update()
   * @protected
   */

  protected willUpdate() {

  }

  /**
   * Called immediately before insert() and update()
   */

  protected willSave() {

  }

  update() {
    if (!this.shouldUpdate()) {
      return Promise.resolve(this);
    }
    this.willUpdate();
    this.willSave();
    const newData = this.serialize();
    return this.fetch(new DSUpdate(this.collectionName, newData, this.sourceQuery));
  }

  abstract serialize(): T;

  toJSON() {
    return this.serialize();
  }

  deserialize(source: T) {
    if (this.shouldDeserialize(source)) {
      this._source = source;
      this.setPropertiesFromSource(source);
      this.notify(new ActiveRecordAction(ActiveRecordAction.ACTIVE_RECORD_DESERIALIZED));
    }
  }

  protected shouldDeserialize(b: T) {
    return true;
  }

  protected setPropertiesFromSource(source: T) {

    this._source = source;

    for (const key in source) {
      this[key] = source[key];
    }
  }

  async fetch(action: IMessage) {
    const { value, done } = await readOneChunk<any>(this.dispatcher.dispatch(action));
    if (value) {
      this.deserialize(value);
    }
    return this;
  }
}


import { Service } from "sf-core/services";
import { IApplication } from "sf-core/application";
import { IEntity } from "../entities";
import { IDiffableNode } from "../markup";
import { Bus } from "mesh";

import {
  IFactory,
  IDependency,
  Dependency,
  Dependencies,
  ClassFactoryDependency
 } from "sf-core/dependencies";

// TODO - add more static find methods to each Dependency here

export * from "./base";

/**
 */

export const APPLICATION_SERVICES_NS = "application/services";
export class ApplicationServiceDependency extends ClassFactoryDependency implements IFactory {

  constructor(id: string, clazz: { new(): Service }) {
    super(`${APPLICATION_SERVICES_NS}/${id}`, clazz);
  }

  create(): Service {
    return super.create();
  }

  static findAll(Dependencies: Dependencies): Array<ApplicationServiceDependency> {
    return Dependencies.queryAll<ApplicationServiceDependency>(`${APPLICATION_SERVICES_NS}/**`);
  }
}

/**
 */

export const APPLICATION_SINGLETON_NS = "singletons/application";
export class ApplicationSingletonDependency extends Dependency<IApplication> {

  constructor(value: IApplication) {
    super(APPLICATION_SINGLETON_NS, value);
  }

  static find(Dependencies: Dependencies): ApplicationSingletonDependency {
    return Dependencies.query<ApplicationSingletonDependency>(APPLICATION_SINGLETON_NS);
  }
}

/**
 */

export const ENTITIES_NS = "entities";

// TODO - possibly require renderer here as well
export class EntityFactoryDependency extends ClassFactoryDependency {

  constructor(id: string, value: { new(source: IDiffableNode): IEntity }) {
    super([ENTITIES_NS, id].join("/"), value);
  }

  create(source: IDiffableNode) {
    return super.create(source);
  }

  static find(id: string, Dependencies: Dependencies) {
    return Dependencies.query<EntityFactoryDependency>([ENTITIES_NS, id].join("/"));
  }

  static createEntity(source: IDiffableNode, Dependencies: Dependencies) {
    return this.find(source.nodeName, Dependencies).create(source);
  }
}

/**
 */

export const BUS_NS = "bus";
export class BusDependency extends Dependency<Bus> {
  constructor(value: Bus) {
    super(BUS_NS, value);
  }
  static getInstance(Dependencies: Dependencies): Bus {
    return Dependencies.query<BusDependency>(BUS_NS).value;
  }
}

/**
 */

export const DEPENDENCIES_NS = "dependencies";
export class DependenciesDependency extends Dependency<Dependencies> {
  constructor(value: Dependencies) {
    super(DEPENDENCIES_NS, value);
  }
}
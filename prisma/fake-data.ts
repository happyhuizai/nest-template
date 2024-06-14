import { MenuType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeGroup() {
  return {
    updatedAt: faker.date.anytime(),
    name: faker.person.fullName(),
  };
}
export function fakeGroupComplete() {
  return {
    id: faker.number.int(),
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    name: faker.person.fullName(),
  };
}
export function fakeGroupRoleComplete() {
  return {
    id: faker.number.int(),
    groupId: faker.number.int(),
    roleId: faker.number.int(),
  };
}
export function fakeUserGroup() {
  return {
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUserGroupComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    userId: faker.number.int(),
    groupId: faker.number.int(),
  };
}
export function fakeUser() {
  return {
    updatedAt: faker.date.anytime(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    isDeleted: false,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
}
export function fakeRole() {
  return {
    updatedAt: faker.date.anytime(),
    name: faker.person.fullName(),
  };
}
export function fakeRoleComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    isDeleted: false,
    name: faker.person.fullName(),
  };
}
export function fakePermissionRoleComplete() {
  return {
    id: faker.number.int(),
    roleId: faker.number.int(),
    permissionId: faker.number.int(),
  };
}
export function fakePermission() {
  return {
    updatedAt: faker.date.anytime(),
    name: faker.person.fullName(),
  };
}
export function fakePermissionComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    isDeleted: false,
    name: faker.person.fullName(),
  };
}
export function fakePermissionMenuComplete() {
  return {
    id: faker.number.int(),
    permissionId: faker.number.int(),
    menuId: faker.number.int(),
  };
}
export function fakeMenu() {
  return {
    updatedAt: faker.date.anytime(),
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([MenuType.DIRECTORY, MenuType.MENU] as const),
    icon: undefined,
    order: undefined,
    route: undefined,
    component: undefined,
    keepAlive: undefined,
    outlink: undefined,
    parentId: undefined,
  };
}
export function fakeMenuComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    isDeleted: false,
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([MenuType.DIRECTORY, MenuType.MENU] as const),
    icon: undefined,
    order: undefined,
    route: undefined,
    component: undefined,
    keepAlive: undefined,
    hidden: false,
    outlink: undefined,
    depth: 0,
    parentId: undefined,
  };
}
export function fakePermissionRuleComplete() {
  return {
    id: faker.number.int(),
    ruleId: faker.number.int(),
    permissionId: faker.number.int(),
  };
}
export function fakeRule() {
  return {
    updatedAt: faker.date.anytime(),
    action: faker.lorem.words(5),
    subject: undefined,
    fields: JSON.stringify({"foo":"5a09343e-76f8-4e29-835f-4cdb9c00137a","bar":132982895542272,"bike":"3","a":"d","b":0.7406976320780814,"name":"Allene","prop":"0b1"}),
    conditions: undefined,
    reason: undefined,
  };
}
export function fakeRuleComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    action: faker.lorem.words(5),
    subject: undefined,
    fields: JSON.stringify({"foo":"d2195b78-ffb4-4875-a119-b64aff87920e","bar":6280493886603264,"bike":"8","a":"U","b":0.5455393958836794,"name":"Francesco","prop":"0b0"}),
    conditions: undefined,
    inverted: false,
    reason: undefined,
  };
}

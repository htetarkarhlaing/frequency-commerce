
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED"
}

export enum UserStatus {
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    SUSPENDED = "SUSPENDED"
}

export enum UserRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER"
}

export enum AdjustmentType {
    ADD = "ADD",
    REMOVE = "REMOVE"
}

export enum OrderStatus {
    IN_REVIEW = "IN_REVIEW",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    PACKAGING = "PACKAGING",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED"
}

export class CreateUserInput {
    email: string;
    password: string;
    userRole?: Nullable<UserRole>;
    status?: Nullable<Status>;
}

export class UpdateUserInput {
    email: string;
    username?: Nullable<string>;
    address?: Nullable<string>;
    dateOfBirth?: Nullable<string>;
}

export class UserLoginInput {
    email: string;
    password: string;
}

export class CreateCategoryInput {
    name: string;
    createdById?: Nullable<string>;
}

export class UpdateCategoryInput {
    name?: Nullable<string>;
    createdById?: Nullable<string>;
}

export class CreatePurchaseRecordInput {
    productId: string;
    amount: number;
}

export class CreateAdjustmentRecordInput {
    productId: string;
    amount: number;
    adjustmentType: AdjustmentType;
}

export class ManageOrderRecord {
    id: string;
    orderStatus: OrderStatus;
}

export class CreateOrderRecordInput {
    totalAmount: number;
    detail: OrderRecordDetail[];
}

export class OrderRecordDetail {
    productId: string;
    qty: number;
    unitPrice: number;
}

export class CreateProductInput {
    name: string;
    image?: Nullable<string>;
    description?: Nullable<string>;
    price: number;
    createdById?: Nullable<string>;
    categoryId?: Nullable<string>;
}

export class UpdateProductInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    createdById?: Nullable<string>;
    categoryId?: Nullable<string>;
}

export class CreateRoleInput {
    name: string;
    permissionList?: Nullable<string[]>;
    status?: Nullable<Status>;
}

export class UpdateRoleInput {
    name?: Nullable<string>;
    status?: Nullable<Status>;
}

export class CreatePermissionInput {
    name: string;
    access?: Nullable<string>;
    status?: Nullable<Status>;
}

export class UpdatePermissionInput {
    name?: Nullable<string>;
    access?: Nullable<string>;
    status?: Nullable<Status>;
}

export abstract class IQuery {
    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getUsers(): User[] | Promise<User[]>;

    abstract whoAmI(): User | Promise<User>;

    abstract getCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract getCategories(): Category[] | Promise<Category[]>;

    abstract getPurchaseRecord(id: string): Nullable<PurchaseRecord> | Promise<Nullable<PurchaseRecord>>;

    abstract getPurchaseRecords(): PurchaseRecord[] | Promise<PurchaseRecord[]>;

    abstract getAdjustmentRecord(id: string): Nullable<StockAdjustmentRecord> | Promise<Nullable<StockAdjustmentRecord>>;

    abstract getAdjustmentRecords(): StockAdjustmentRecord[] | Promise<StockAdjustmentRecord[]>;

    abstract getOrderRecord(id: string): Nullable<PurchaseRecord> | Promise<Nullable<PurchaseRecord>>;

    abstract getOrderRecords(): PurchaseRecord[] | Promise<PurchaseRecord[]>;

    abstract getProduct(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract getProducts(): Product[] | Promise<Product[]>;

    abstract getRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract getRoles(): Role[] | Promise<Role[]>;

    abstract getPermission(id: string): Nullable<Permission> | Promise<Nullable<Permission>>;

    abstract getPermissions(): Permission[] | Promise<Permission[]>;
}

export abstract class IMutation {
    abstract createUser(data: CreateUserInput): User | Promise<User>;

    abstract updateUser(data: UpdateUserInput): User | Promise<User>;

    abstract login(data: UserLoginInput): Nullable<Tokens> | Promise<Nullable<Tokens>>;

    abstract createCategory(data: CreateCategoryInput): Category | Promise<Category>;

    abstract createPurchaseRecord(data: CreatePurchaseRecordInput): PurchaseRecord | Promise<PurchaseRecord>;

    abstract createAdjustmentRecord(data: CreateAdjustmentRecordInput): StockAdjustmentRecord | Promise<StockAdjustmentRecord>;

    abstract createOrderRecord(data: CreateOrderRecordInput): OrderRecord | Promise<OrderRecord>;

    abstract manageOrderRecord(data: ManageOrderRecord): OrderRecord | Promise<OrderRecord>;

    abstract createProduct(data: CreateProductInput, image: Upload): Product | Promise<Product>;

    abstract updateProduct(id: string, data: UpdateProductInput): Product | Promise<Product>;

    abstract deleteProduct(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract uploadProductImage(productId: string, file: Upload): Product | Promise<Product>;

    abstract createRole(data: CreateRoleInput): Role | Promise<Role>;

    abstract updateRole(id: string, data: UpdateRoleInput): Role | Promise<Role>;

    abstract deleteRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createPermission(data: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(id: string, data: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(id: string): Nullable<Permission> | Promise<Nullable<Permission>>;
}

export class Tokens {
    accessToken: string;
    refreshToken: string;
}

export class User {
    id: string;
    email: string;
    password: string;
    username?: Nullable<string>;
    address?: Nullable<string>;
    dateOfBirth?: Nullable<string>;
    userStatus: UserStatus;
    refreshToken?: Nullable<string>;
    fcmToken?: Nullable<string>;
    userRole: UserRole;
    status: Status;
    createdAt: string;
    updatedAt: string;
    Category: Category[];
    Product: Product[];
    PurchaseRecord: PurchaseRecord[];
    StockAdjustmentRecord: StockAdjustmentRecord[];
    CreatedOrderRecord: OrderRecord[];
    ApprovedOrderRecord: OrderRecord[];
}

export class Category {
    id: string;
    name: string;
    createdById?: Nullable<string>;
    CreatedBy?: Nullable<User>;
    status: Status;
    createdAt: string;
    updatedAt: string;
    Product: Product[];
}

export class PurchaseRecord {
    id: string;
    productId?: Nullable<string>;
    Product?: Nullable<Product>;
    createdById?: Nullable<string>;
    CreatedBy?: Nullable<User>;
    amount: number;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export class StockAdjustmentRecord {
    id: string;
    productId?: Nullable<string>;
    Product?: Nullable<Product>;
    createdById?: Nullable<string>;
    CreatedBy?: Nullable<User>;
    amount: number;
    status: Status;
    adjustmentType: AdjustmentType;
    createdAt: string;
    updatedAt: string;
}

export abstract class ISubscription {
    abstract OrderStatusChange(orderId: string): Nullable<OrderRecord> | Promise<Nullable<OrderRecord>>;
}

export class OrderRecord {
    id: string;
    orderCreatedById: string;
    OrderCreatedBy?: Nullable<User>;
    orderApprovedById: string;
    OrderApprovedBy?: Nullable<User>;
    totalAmount: number;
    orderStatus: OrderStatus;
    status: Status;
    createdAt: string;
    updatedAt: string;
    OrderDetail: OrderDetail[];
}

export class OrderDetail {
    id: string;
    productId: string;
    Product?: Nullable<Product>;
    orderRecordId: string;
    OrderRecord?: Nullable<OrderRecord>;
    qty: number;
    unitPrice: number;
    total: number;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export class Product {
    id: string;
    name: string;
    image?: Nullable<string>;
    description?: Nullable<string>;
    price: number;
    stock: number;
    createdById?: Nullable<string>;
    createdBy?: Nullable<User>;
    categoryId?: Nullable<string>;
    Category?: Nullable<Category>;
    status: Status;
    createdAt: string;
    updatedAt: string;
    PurchaseRecord: PurchaseRecord[];
    StockAdjustmentRecord: StockAdjustmentRecord[];
    OrderDetail: OrderDetail[];
}

export class File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export class Role {
    id: string;
    name: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
    RoleOnPermissions?: Nullable<RoleOnPermissions[]>;
}

export class Permission {
    id: string;
    name: string;
    access: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
    RoleOnPermissions?: Nullable<RoleOnPermissions[]>;
}

export class RoleOnPermissions {
    id: string;
    permissionId?: Nullable<string>;
    Permission?: Nullable<Permission>;
    roleId?: Nullable<string>;
    Role?: Nullable<Role>;
    status: Status;
    createdAt: string;
    updatedAt: string;
}

export type Upload = any;
type Nullable<T> = T | null;

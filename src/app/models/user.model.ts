export class User {
  id: string;
  createAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  permissions: string[];
  roles: any[];
  constructor() {
    this.id = '';
    this.createAt = new Date();
    this.updatedAt = new Date();
    this.name = '';
    this.email = '';
    this.permissions = [];
    this.roles = [];
  }
}

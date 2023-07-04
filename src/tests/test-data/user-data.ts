

export const testUser = {
  username: "",
  password: "",
  firstName : "",
  lastName : "",
  zipCode : "",
  desiredItemName: ""
  
};

export const standardUser = {
    username :'standard_user',
    password : 'secret_sauce',
    firstName : 'John',
    lastName : 'Johnson',
    zipCode : '112232',
    desiredItemName : 'sauce-labs-backpack'
}

export class StandardUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  desiredItemName: 'sauce-labs-bike-light' | 'sauce-labs-backpack' | 'sauce-labs-bolt-t-shirt' | 'sauce-labs-fleece-jacket';

  constructor() {
    this.username = 'standard_user';
    this.password = 'secret_sauce';
    this.firstName = 'John';
    this.lastName = 'Johnson';
    this.zipCode = '112232';
    this.desiredItemName = 'sauce-labs-backpack'; 
  }
}

export class LockedOutUser {
  username: string;
  password: string;
  zipCode: string;
  desiredItemName: string;

  constructor() {
    this.username = 'locked_out_user';
    this.password = 'secret_sauce';
    this.zipCode = '223467';
    this.desiredItemName = ''; //Empty by default
  }
}

export class ProblemUser {
  username: string;
  password: string;
  zipCode: string;
  desiredItemName: string;

  constructor() {
    this.username = 'problem_user';
    this.password = 'secret_sauce';
    this.zipCode = '62727';
    this.desiredItemName = ''; //Empty by default
  }
}

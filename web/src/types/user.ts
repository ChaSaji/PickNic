export default interface AuthUser {
  user: User;
  organization: Organization;
  accessToken?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

interface Organization {
  id: string;
  name: string;
}

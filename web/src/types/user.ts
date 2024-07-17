export default interface AuthUser {
  user: User;
  organization: Organization;
  accessToken?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Organization {
  id: string;
  name: string;
}

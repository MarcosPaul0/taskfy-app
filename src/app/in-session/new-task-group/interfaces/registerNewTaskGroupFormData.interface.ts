export interface RegisterNewTaskGroupFormData {
  taskGroup: {
    name: string;
    description: string;
    isPrivate: boolean;
    primaryColor?: string;
  };
  usersToInvite: {
    currentEmail: string;
    emails: string[];
  };
}

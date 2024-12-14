interface IAuditLog {
  id: number;
  user: {
    name: string;
  };
  action: string;
  resource: string;
  createdAt: string;
}

export default IAuditLog;

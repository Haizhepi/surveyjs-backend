enum Role {
  participant = "participant",
  experimenter = "experimenter",
  admin = "admin",
}

enum Status {
  new = "new",
  not_verified = "not_verified",
  returning = "returning",
}

export interface User {
  name: string;
  email: string;
  password: string;
  finished_prereq?: boolean;
  role?: Role;
  status?: Status;
}

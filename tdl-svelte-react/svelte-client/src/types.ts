export type TodoType = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: boolean;
};

export type User = {
  name: string;
  password: string;
};

export type Message = {
  message: string;
};

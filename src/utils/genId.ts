import { v4 as uuid } from "uuid";

const genId = () => {
  return uuid();
};

export default genId;

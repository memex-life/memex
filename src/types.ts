// types.ts

export interface Message {
  textContent: string;
  metadata: {
    url: string;
    timestamp: string;
  };
}
export interface Document  {
  textContent: string;
  metadata: {
      [key: string]: string;
  };
};

// types.ts

export interface Message {
  textContent: string;
  metadata: {
    url: string;
    timestamp: string;
  };
}

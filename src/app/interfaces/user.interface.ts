export default interface User {
  id: string;
  name: string;
  notes: Array<{
    title: string,
    content: string
  }>;
}
interface IMessage {
  message: string
}
export function hasMessage(obj: unknown): obj is IMessage {
  return (obj as IMessage).message !== undefined
}

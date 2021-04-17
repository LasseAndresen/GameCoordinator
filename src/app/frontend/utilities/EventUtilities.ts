export enum KeyCodeEnum {
    Enter = 1,
    Tab = 2
}

export class EventUtilities {
  public static getKeyCodeFromEvent(event: KeyboardEvent): KeyCodeEnum {
    // http://gcctech.org/csc/javascript/javascript_keycodes.htm
    switch (event.key) {
        case 'Enter':
          return KeyCodeEnum.Enter;
        default:
          return null;
    }
  }
}

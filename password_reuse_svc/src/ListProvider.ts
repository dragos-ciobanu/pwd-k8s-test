export interface ListProvider {
    find(text: string): boolean;
    isPasswordInLast10(text: string): boolean;
}

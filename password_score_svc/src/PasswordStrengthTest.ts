export class PasswordStrengthTest {
    /** Positives */
    public static numberOfCharacters(text: string): number {
        return text?.length * 4;
    }

    public static uppercaseLetters(text: string): number {
        const uppercaseLetterNo: number = (text.match(/[A-Z]/g) || []).length;
        return uppercaseLetterNo == 0 ? 0 : (text.length - uppercaseLetterNo) * 2;
    }

    public static lowercaseLetters(text: string): number {
        const lowercaseLetterNo: number = (text.match(/[a-z]/g) || []).length;
        return lowercaseLetterNo == 0 ? 0 : (text.length - lowercaseLetterNo) * 2;
    }

    public static numbers(text: string): number {
        const numberNo: number = (text.match(/[0-9]/g) || []).length;
        return numberNo * 4;
    }

    public static symbols(text: string): number {
        const symbolNo: number = (text.match(/[^a-zA-Z0-9]/g) || []).length;
        return symbolNo * 6;
    }

    public static middleNumberOrSymbols(text: string): number {
        text = text.slice(1, -1);
        const symbolsAndNumbersCount: number = (text.match(/[^a-zA-Z]/g) || []).length;
        return symbolsAndNumbersCount * 2;
    }

    public static requirementsFulfilled(fulfilledRequirements: number, minRequirements:number): number {
        return fulfilledRequirements >= minRequirements ? fulfilledRequirements * 2 : 0;
    }

    /** Negatives */
    public static lettersOnly(text: string): number {
        const hasOnlyLetters: boolean = /^[a-z]+$/gi.test(text);
        return hasOnlyLetters ? text.length * -1 : 0;
    }

    public static numbersOnly(text: string): number {
        const hasOnlyNumbers: boolean = /^[0-9]+$/g.test(text);
        return hasOnlyNumbers ? text.length * -1 : 0;
    }

    public static repeatCharacters(text: string): number {
        /** Took the algorithm as it was in the example */
        let isCurrentCharDuplicate: boolean = false;
        let repetitionScore: number = 0;
        let repeatingCharCount: number = 0;
        for (let charIndex = 0; charIndex < text.length; charIndex++) {
            isCurrentCharDuplicate = false;
            for (let duplicateIndex = 0; duplicateIndex < text.length; duplicateIndex++) {
                if (text[charIndex] == text[duplicateIndex] && charIndex != duplicateIndex) {
                    isCurrentCharDuplicate = true;
                    repetitionScore += Math.abs(text.length / (duplicateIndex - charIndex));
                }
            }
            if (isCurrentCharDuplicate) {
                repeatingCharCount++;
                const uniqueCharCount: number = text.length - repeatingCharCount;
                repetitionScore = (uniqueCharCount) ?
                    Math.ceil(repetitionScore / uniqueCharCount) :
                    Math.ceil(repetitionScore);
            }
        }

        return repetitionScore * -1;
    }

    public static consecutiveUppercaseLetters(text: string): number {
        return PasswordStrengthTest.getConsecutiveCharactersCount(text, isUppercaseLetter) * 2 * -1;
    }

    public static consecutiveLowercaseLetters(text: string): number {
        return PasswordStrengthTest.getConsecutiveCharactersCount(text, isLowercaseLetter) * 2 * -1;
    }

    public static consecutiveNumbers(text: string): number {
        return PasswordStrengthTest.getConsecutiveCharactersCount(text, isDigit) * 2 * -1;
    }

    public static sequentialLetter(text: string): number {
        const sequentialLettersCount = PasswordStrengthTest.getMaxSequentialCharCount(text, isLowercaseLetter);

        return sequentialLettersCount * 3 * -1;
    }

    public static sequentialNumbers(text: string): number {
        const sequentialLettersCount = PasswordStrengthTest.getMaxSequentialCharCount(text, isDigit);

        return sequentialLettersCount * 3 * -1;
    }

    public static sequentialSymbols(text: string): number {
        const sequentialLettersCount = PasswordStrengthTest.getMaxSequentialCharCount(text, isSymbol);

        return sequentialLettersCount * 3 * -1;
    }

    private static getConsecutiveCharactersCount(text: string, typeCheck: Function): number {
        if (text.length < 2) return 0;
        let consecutiveCharsCount: number = 0;
        for (let i = 1; i < text.length; i++) {
            if (typeCheck(text[i]) && typeCheck(text[i - 1]))
                consecutiveCharsCount++
        }

        return consecutiveCharsCount;
    }

    private static getMaxSequentialCharCount(text: string, typeCheck: Function): number {
        let differences: number[] = new Array(text.length);
        let lastDifference = 1;
        for (let i = 0; i < text.length; i++) {
            if (i == 0 || !typeCheck(text[i])) {
                differences[i] = 0;
                continue;
            }

            const diff = text.charCodeAt(i) - text.charCodeAt(i - 1);
            if (Math.abs(diff) == 1) {
                if (diff == lastDifference) {
                    differences[i] = differences[i - 1] + diff;
                } else {
                    lastDifference = diff;
                    differences[i] = diff;
                }
            } else {
                differences[i] = 0;
            }
        }

        const maxSequenceCount = Math.max.apply(null, differences.map(Math.abs));

        return maxSequenceCount < 2 ? 0 : maxSequenceCount - 1;

    }
}

const isUppercaseLetter = (char: string): boolean => /[A-Z]/g.test(char);
const isLowercaseLetter = (char: string): boolean => /[a-z]/g.test(char);
const isDigit = (char: string): boolean => /[0-9]/g.test(char);
const isSymbol = (char: string): boolean => /[^a-zA-Z0-9]/g.test(char);

import {PasswordStrengthTest} from "./PasswordStrengthTest";

export class PasswordScore {
    private static readonly strengthTests = {
        "positive": [
            PasswordStrengthTest.numberOfCharacters,
            PasswordStrengthTest.uppercaseLetters,
            PasswordStrengthTest.lowercaseLetters,
            PasswordStrengthTest.numbers,
            PasswordStrengthTest.symbols,
            PasswordStrengthTest.middleNumberOrSymbols
        ],
        "negative": [
            PasswordStrengthTest.lettersOnly,
            PasswordStrengthTest.numbersOnly,
            PasswordStrengthTest.repeatCharacters,
            PasswordStrengthTest.consecutiveUppercaseLetters,
            PasswordStrengthTest.consecutiveLowercaseLetters,
            PasswordStrengthTest.consecutiveNumbers,
            PasswordStrengthTest.sequentialLetter,
            PasswordStrengthTest.sequentialNumbers,
            PasswordStrengthTest.sequentialSymbols
        ]
    };

    private static readonly MIN_SCORE: number = 0;
    private static readonly MAX_SCORE: number = 100;
    private static readonly MIN_REQUIREMENTS: number = 4;


    public static getScore(passwordText: string): number {
        let score: number = 0;
        let requirementsFulfilled: number = 0;

        for (let strengthTest of PasswordScore.strengthTests["positive"]) {
            const testScore: number = strengthTest(passwordText);

            if (testScore > 0) {
                requirementsFulfilled++;
                score += testScore;
            }
        }

        for (let strengthTest of PasswordScore.strengthTests["negative"]) {
            const testScore: number = strengthTest(passwordText);
            score += testScore;
        }

        score += PasswordStrengthTest.requirementsFulfilled(requirementsFulfilled, PasswordScore.MIN_REQUIREMENTS);

        return PasswordScore.adjustScoreToInterval(score)
    }

    private static adjustScoreToInterval(
        score: number,
        min: number = PasswordScore.MIN_SCORE,
        max: number = PasswordScore.MAX_SCORE
    ): number {
        return Math.min(Math.max(score, min), max);
    }
}

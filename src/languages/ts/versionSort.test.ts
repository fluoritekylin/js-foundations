import {versionSort} from "./versionSort.js";

describe('versionSort basic cases', () => {
    test('sort simple 3-segment versions', () => {
        const input = ['1.2.0', '1.2.1', '1.10.3', '1.2.9', '1.3']
        const expected = ['1.2.0', '1.2.1', '1.2.9', '1.3', '1.10.3']
        expect(versionSort(input)).toEqual(expected)
    })

    test('handle different lengths (1.2 vs 1.2.0)', () => {
        const input = ['1.2.1', '1.2', '1.2.0']
        const expected = ['1.2', '1.2.0', '1.2.1']
        expect(versionSort(input)).toEqual(expected)
    })

    test('handle large numbers correctly', () => {
        const input = ['1.2.10', '1.2.2', '1.2.9']
        const expected = ['1.2.2', '1.2.9', '1.2.10']
        expect(versionSort(input)).toEqual(expected)
    })

    test('ignore leading zeros', () => {
        const input = ['1.01.3', '1.1.2', '1.1.10']
        const expected = ['1.1.2', '1.01.3', '1.1.10']
        expect(versionSort(input)).toEqual(expected)
    })

    test('handle non-numeric parts gracefully', () => {
        const input = ['1.0.a', '1.0.1']
        const expected = ['1.0.a', '1.0.1'] // depending on rule (a→0 or invalid)
        expect(versionSort(input)).toEqual(expected)
    })

    test('handle pre-release tags (alpha, beta, rc)', () => {
        const input = ['1.0.0', '1.0.0-beta', '1.0.0-alpha']
        const expected = ['1.0.0-alpha', '1.0.0-beta', '1.0.0']
        expect(versionSort(input)).toEqual(expected)
    })

    test('handle long versions with missing parts', () => {
        const input = ['1', '1.0.1', '1.0.0.0.1']
        const expected = ['1', '1.0.0.0.1', '1.0.1']
        expect(versionSort(input)).toEqual(expected)
    })

    test('handle repeated major versions', () => {
        const input = ['2.0.0', '1.9.9', '1.10.0']
        const expected = ['1.9.9', '1.10.0', '2.0.0']
        expect(versionSort(input)).toEqual(expected)
    })

    test('stable sorting (equal versions preserve order)', () => {
        const input = ['1.0.0', '1.0.0', '1.0.1']
        const expected = ['1.0.0', '1.0.0', '1.0.1']
        expect(versionSort(input)).toEqual(expected)
    })
})

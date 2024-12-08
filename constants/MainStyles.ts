import { StyleSheet } from "react-native";

export const MainStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 24,
    },

    h1: {
        fontFamily: 'Raydis',
        fontSize: 40,
        lineHeight: 40,
    },

    h2: {
        fontFamily: 'Inter',
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '900',
    },

    h3: {
        fontFamily: 'Raydis',
        fontSize: 24,
        lineHeight: 24,
    },

    h4: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '900',
    },

    p: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '400',
    },

    thin: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 20,
        opacity: 0.5,
        fontWeight: '100',
    }
})
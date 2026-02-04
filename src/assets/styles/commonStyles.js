import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        paddingHorizontal: 20
    },
    textLogo: {
        color: '#3C4043',
        fontWeight: '900',
        fontSize: 22
    },
    primaryHeading: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15
    },
    loadingView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formGroup: {
        marginBottom: 15
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        flex: 1,
        height: 49,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        color: '#000',
        paddingHorizontal: 14
    },
    input2: {
        backgroundColor: '#f0f0f0',
        borderRadius: 22,
        height: 48,
        color: '#000',
        paddingHorizontal: 18
    },
    inputBox: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        color: '#000',
        paddingHorizontal: 14
    },
    btn: {
        fontSize: 16,
        borderRadius: 12,
        alignItems: "center",
        flexShrink: 1,
        padding: 14,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    btnPrimary: {
        backgroundColor: "#fb961b",
    },
    btnSecondary: {
        // backgroundColor: "#456efe",
        backgroundColor: "#1e90ff",
    },
    btnSuccess: {
        backgroundColor: "#28a745",
    },
    btnDanger: {
        backgroundColor: "#d32f2f",
    },
    btnWarning: {
        backgroundColor: "#ffc107",
    },
    btnDark: {
        backgroundColor: "#000",
    },
    btnInfo: {
        backgroundColor: "#17a2b8",
    },
    btnDefault: {
        backgroundColor: "#fff",
    },
    btnLink: {
        color: '#0b5aecff',
        fontSize: 14
    },
    btnOutline: {
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        padding: 14,
    },
    btnOutlineDark: {
        borderColor: '#bebebeff'
    },
    btnOutlineDarkText: {
        color: '#333',
        fontWeight: 600
    },
    btnSm: {
        fontSize: 12,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    btnFullWidth: {
        width: '100%'
    },
    btnDisabled: {
        // backgroundColor: "#b9b9b9ff",
        // borderColor: "#ddd",
        opacity: 0.6,
    },
    row: {
        flexDirection: 'row'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemsCenter: {
        alignItems: 'center',
    },
    rowBetweenAligned: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowAligned: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    allCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    text_1: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text_2: {
        fontSize: 22
    },
    text_3: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text_4: {
        fontSize: 18,
        fontWeight: '700'
    },
    text_5: {
        fontSize: 16
    },
    text_6: {
        fontSize: 14
    },
    text_7: {
        fontSize: 12
    },
    textCenter: {
        textAlign: 'center'
    },
    error: {
        color: '#f00',
    },
    textWhite: {
        color: '#fff',
    },
    textPrimary: {
        color: '#fb961b'
    },
    textLight: {
        color: '#3C4043'
    },
    textMuted: {
        color: '#7c7c7cff'
    },
    fwBold: {
        fontWeight: 'bold'
    },
    fwMedium: {
        fontWeight: '600'
    },
    badge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20
    },
    badgeText: { color: '#2979FF', fontWeight: '600' },
    mt_1: { marginTop: 5 },
    mt_2: { marginTop: 10 },
    mt_3: { marginTop: 15 },
    mt_4: { marginTop: 20 },
    mt_5: { marginTop: 25 },
    mt_6: { marginTop: 30 },
    mt_7: { marginTop: 35 },
    mt_8: { marginTop: 40 },
    mt_9: { marginTop: 45 },
    mt_10: { marginTop: 50 },
    mb_0: { marginBottom: 0 },
    mb_1: { marginBottom: 5 },
    mb_2: { marginBottom: 10 },
    mb_3: { marginBottom: 15 },
    mb_4: { marginBottom: 20 },
    mb_5: { marginBottom: 25 },
    mb_6: { marginBottom: 30 },
    mb_7: { marginBottom: 35 },
    mb_8: { marginBottom: 40 },
    mb_9: { marginBottom: 45 },
    mb_10: { marginBottom: 50 },
    ml_1: { marginLeft: 5 },
    ml_2: { marginLeft: 10 },
    ml_3: { marginLeft: 15 },
    ml_4: { marginLeft: 20 },
    ml_5: { marginLeft: 25 },
    ml_6: { marginLeft: 30 },
    ml_7: { marginLeft: 35 },
    ml_8: { marginLeft: 40 },
    ml_9: { marginLeft: 45 },
    ml_10: { marginLeft: 50 },
    mr_1: { marginRight: 5 },
    mr_2: { marginRight: 10 },
    mr_3: { marginRight: 15 },
    mr_4: { marginRight: 20 },
    mr_5: { marginRight: 25 },
    mr_6: { marginRight: 30 },
    mr_7: { marginRight: 35 },
    mr_8: { marginRight: 40 },
    mr_9: { marginRight: 45 },
    mr_10: { marginRight: 50 },
})
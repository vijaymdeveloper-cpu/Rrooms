import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const GlobalModal = ({
    show,
    onClose,
    title = "Modal Title",
    children,
}) => {
    return (
        <Modal
            visible={show}
            transparent
            animationType="slide"
            statusBarTranslucent
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.sheet}>

                    {/* 🔹 Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {/* 🔹 Body */}
                    <View style={styles.body}>
                        {children}
                    </View>

                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default GlobalModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    sheet: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingBottom: 25
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 70,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    body: {
        padding: 0
    },
});

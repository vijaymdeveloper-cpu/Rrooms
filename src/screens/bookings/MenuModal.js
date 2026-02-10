import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import services from "@api/services";
import { finalBaseUrl } from '@api/client'

const { width } = Dimensions.get("window");

const MenuModal = ({ show, setShow, propertyId }) => {

    const [menu, setMenu] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchMenu = async (propertyId) => {
        try {
            const res = await services.getMenuByPropertyIdService(propertyId)
            if (res?.data?.status) {
                setMenu(res?.data?.data)
            }
        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {
        fetchMenu(propertyId)
    }, [propertyId])

    const onClose = () => {
        setShow(false)
        setMenu([])
    }

    const onScrollEnd = e => {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / width
        );
        setActiveIndex(index);
    };

    return (
        <Modal visible={show} animationType="slide" transparent statusBarTranslucent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Menu Card</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} />
                        </TouchableOpacity>
                    </View>

                    {
                        menu?.length > 0 ? (
                            <>
                                {/* Image Slider */}
                                <FlatList
                                    data={menu}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id.toString()}
                                    onMomentumScrollEnd={onScrollEnd}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.imageWrap}>
                                                <Image
                                                    source={{
                                                        uri: `${finalBaseUrl}images/${item?.menuCard}`,
                                                    }}
                                                    style={styles.image}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                        )
                                    }}
                                />
                                {/* Dots Indicator */}
                                <View style={styles.dotsWrap}>
                                    {menu.map((_, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.dot,
                                                activeIndex === i && styles.activeDot,
                                            ]}
                                        />
                                    ))}
                                </View>
                            </>) : <Text style={{textAlign: 'center', paddingVertical: 40 }}>No Menu Card Available</Text>
                    }

                </View>
            </View>
        </Modal>
    );
};

export default MenuModal;


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    content: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "90%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 20,
        height: 70,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    imageWrap: {
        width,
        height: 420,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: width - 40,
        height: "100%",
        borderRadius: 12,
    },
    dotsWrap: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 10,
        marginBottom: 20
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
    },
    activeDot: {
        backgroundColor: "#28a745",
        width: 10,
        height: 10,
    },
});

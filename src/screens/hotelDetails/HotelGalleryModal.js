import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Pressable
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseImgUrl } from '@api/client';

const HotelGalleryModal = ({ visible, images = [], onClose }) => {

    const [activeTab, setActiveTab] = useState('');

    const tabMenus = [...new Set(images.map(item => item.title))];

    const imagesData = images.reduce((acc, curr) => {
        const found = acc.find(item => item.name === curr.title);
        if (found) {
            found.images.push(curr.image);
        } else {
            acc.push({ name: curr.title, images: [curr.image] });
        }
        return acc;
    }, []);

    useEffect(() => {
        if (tabMenus.length) {
            setActiveTab(tabMenus[0]);
        }
    }, [visible]);

    const activeImages = imagesData.find(item => item.name === activeTab)?.images || [];

    return (
        <Modal visible={visible} animationType="slide" statusBarTranslucent transparent>

            <Pressable style={styles.backdrop} onPress={onClose} />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Image Gallery ({images?.length})</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={26} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>

                    <FlatList
                        data={tabMenus}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabContainer}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.tabBox,
                                    activeTab === item && styles.activeTab,
                                ]}
                                onPress={() => setActiveTab(item)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === item && styles.activeTabText,
                                    ]}
                                >
                                    {item == 'DReception' ? 'Reception' : item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                    <FlatList
                        data={activeImages}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: encodeURI(`${baseImgUrl}${item}`) }}
                                style={styles.image}
                            />
                        )}
                    />
                </View>

            </View>
        </Modal>
    );
};

export default HotelGalleryModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 720
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 25,
        paddingHorizontal: 15
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    body: {
        paddingVertical: 25,
        paddingHorizontal: 15
    },
    tabContainer: {
        marginBottom: 20
    },
    tabBox: {
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: '#000',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
    },
    activeTabText: {
        color: '#ffbe6e',
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 6,
        backgroundColor: '#eee',
        marginBottom: 18
    },
});

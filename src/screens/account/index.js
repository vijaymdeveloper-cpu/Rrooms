import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Alert, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { baseImgUrl, baseUrl } from '@api/client';
import { fetchUserData, clearAuthState, resetAuth } from '@store/slices/authSlice';
import { isValidImage } from '@utils';
import Ionicons from "react-native-vector-icons/Ionicons";
import { commonStyles } from '@assets/styles/commonStyles';

const MENU_ITEMS = [
  { title: "Wallet Balance", icon: "wallet-outline", link: 'Wallet', authOnly: true },
  { title: "Privacy Policy", icon: "shield-checkmark-outline", link: 'https://rrooms.in/Rrooms-privacy-policy' },
  { title: "Help & Support", icon: "help-circle-outline", link: 'HELP_SUPPORT' },
  { title: "FAQs", icon: "chatbubble-ellipses-outline", link: 'FAQ' },
  { title: "About Us", icon: "information-circle-outline", link: 'ABOUT_US' },
  { title: "Terms & Condition", icon: "document-text-outline", link: 'CONDITIONS' },
  { title: "Refer & Earn", icon: "gift-outline", link: 'Referral', authOnly: true },
  { title: "Log out", icon: "log-out-outline", danger: true, authOnly: true },
];

const MyProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState({})
  const [imgFile, setImgFile] = useState(null);

  const dispatch = useDispatch();
  const { access_token, userDetail } = useSelector((state) => state.auth)

  useEffect(() => {
    setUserData(userDetail)
    setImgFile(userDetail?.profileImage)
  }, [])

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    if (item.authOnly && !userDetail?.id) return false;
    return true;
  });

  const logoutFunction = () => {
    Alert.alert(
      "Confirm",
      "Are you sure do you want to logout?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: () => {
            dispatch(clearAuthState())
            if (navigation) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.profileSection}>
          <View style={styles.profileWrapper}>
            <Image
              source={
                isValidImage(imgFile)
                  ? { uri: `${baseImgUrl}${imgFile}` }
                  : require('@assets/images/img-profile.png')
              }
              style={styles.profileImage}
            />
          </View>

          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.username}>{userData?.email}</Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditAccount', { userData, baseImgUrl, access_token, fetchUserData })}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.menuCard}>
            {filteredMenuItems.map((item, index) => {

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    if (item.title == 'Log out') {
                      logoutFunction()
                    }
                    else if (item?.title == 'Privacy Policy') {
                      Linking.openURL('https://rrooms.in/Rrooms-privacy-policy');
                    }
                    else {
                      navigation.navigate(item?.link)
                    }
                  }}>
                  <View style={styles.menuLeft}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.danger ? "#E53935" : "#000"}
                    />
                    <Text
                      style={[
                        styles.menuText,
                        item.danger && { color: "#E53935" }
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  profileSection: {
    alignItems: "center",
    marginTop: 70
  },
  profileWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ddd',
    overflow: 'hidden',
    padding: 4
  },
  profileImage: {
    width: 82,
    height: 82,
    borderRadius: 45,
    backgroundColor: '#fff'
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
  },

  username: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  editBtn: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 22,
    marginTop: 14,
  },

  editText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 24,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.6,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    fontSize: 15,
    marginLeft: 14,
  },
});

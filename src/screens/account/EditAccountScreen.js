import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { baseUrl } from '@api/client'
import { commonStyles } from "@assets/styles/commonStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import { showToast } from '@utils/Toaster';
import { fetchUserData } from '@store/slices/authSlice';
import { useDispatch } from "react-redux";

const EditAccountScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { access_token, userData, baseImgUrl } = route.params || {};

  const [sendImg, setSendImg] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      company: userData?.company || "",
      address: userData?.address || "",
      gst: userData?.gst || "",
    },
  });

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          const asset = response.assets[0];
          setSendImg({
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
          });
        }
      }
    );
  };

  const saveEditHandler = async (payload) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", sendImg);
      formData.append("name", payload.name ?? "");
      formData.append("email", payload.email ?? "");
      formData.append("company", payload.company ?? "");
      formData.append("address", payload.address ?? "");
      formData.append("gst", payload.gst ?? "");
      const response = await fetch(
        `${baseUrl}auth/update-user/${userData?.id}`,
        {
          method: "PUT",
          headers: {
            Cookie:
              "connect.sid=s%3A280LQxRFQk2NPuNO83Va6pUDtYxyOoHp.hXhUN7wrGyeUEXkrzjDhMmLUNrCW7ot1vgUPGEnZmh4",
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (result.status) {
        showToast('message', result.message);
        dispatch(fetchUserData(userData?.id))
        navigation.goBack()
      }
    } catch (err) { console.log(err) }
  };

  console.log('userData', userData)


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity onPress={handleSubmit(saveEditHandler)}>
          <Ionicons name="checkmark" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={
              sendImg
                ? { uri: sendImg.uri }
                : userData?.profileImage
                  ? { uri: `${baseImgUrl}${userData?.profileImage}` }
                  : require("@assets/images/img-profile.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Ionicons name="camera-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter name"
                />
              )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
          </View>

          {/* Email */}
          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </View>

          {/* Company */}
          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Company</Text>
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter company"
                />
              )}
            />
          </View>

          {/* Address */}
          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Address</Text>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter address"
                />
              )}
            />
          </View>

          {/* GST */}
          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>GST</Text>
            <Controller
              control={control}
              name="gst"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter GST number"
                />
              )}
            />
          </View>

          {/* Save Button */}
          <View style={[commonStyles.formGroup, commonStyles.mt_2]}>
            <TouchableOpacity
              style={[commonStyles.btn, commonStyles.btnPrimary]}
              onPress={handleSubmit(saveEditHandler)}
            >
              <Text style={commonStyles.btnText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditAccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  imageWrapper: { alignItems: "center", marginVertical: 10 },
  profileImage: { width: 96, height: 96, borderRadius: 48 },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
    elevation: 4,
  },
  form: { paddingHorizontal: 20 },
  error: { color: "red", fontSize: 12, marginTop: 2 },
});

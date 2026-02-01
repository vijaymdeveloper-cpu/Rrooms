import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
  BackHandler
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import services from "@api/services";
import { commonStyles } from '@assets/styles/commonStyles';
import { setGuest } from "@store/slices/authSlice";
import {
  getHash,
  requestHint,
  useOtpVerify,
} from 'react-native-otp-verify';

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors },setValue,getValues } = useForm();

  const [loading, setLoading] = useState(false);

    const { hash } = useOtpVerify({ numberOfDigits: 4 });


  const handleSendOtp = async (hashKey) => {
    if (loading) return;

    try {
      setLoading(true);
    const { mobile } = getValues();
      const payload = {
        mobile: mobile,
        hash_key: hashKey[0] || hash[0],
        platform: 2
      };
      const res = await services.sendOtpService(payload);

      if (res.data.status) {
        if (res?.data?.isNewUser) {
          navigation.navigate("Signup", { mobile: mobile});
        } else {
          navigation.navigate("Otp", {
            mobile: mobile,
            name: res?.data?.data?.name,
            email: res?.data?.data?.email
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestHint().then(number => {
        setValue("mobile", number.substring(number.length - 10, number.length))
        getHash().then(hash => {
          console.log("Hash key: ", hash);
          handleSendOtp(hash)
        }).catch(console.log);
      })
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => navigation.goBack()
    );
    return () => {
      backHandler.remove();
    }
  }, []);


  return (

    <LinearGradient
      colors={["#ffdcc5ff", "#fff", "#dfdfdfff"]}
      style={styles.viewArea}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
              <Image
                source={require("@assets/images/logo.png")}
                style={styles.logo}
              />

              <Text style={styles.tagline}>
                You have got place to be & people to see..
              </Text>
              <Text style={styles.subTagline}>
                So go anywhere with RRooms..
              </Text>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
              <Text style={styles.title}>Login/Signup</Text>

              <Text style={styles.desc}>
                Tap "Continue" to get an SMS confirmation to help you user{" "}
                <Text style={{ color: "#FF8C00", fontWeight: "600" }}>
                  RRooms
                </Text>
                . We would like your phone number.
              </Text>

              <View style={commonStyles.mb_1}>
                <Text style={styles.label}>Mobile Number</Text>
                <Controller
                  control={control}
                  name="mobile"
                  rules={{
                    required: "Mobile number required",
                    minLength: { value: 10, message: "10 digit number required" },
                    maxLength: { value: 10, message: "10 digit number required" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Mobile Number"
                      placeholderTextColor={'#555'}
                      keyboardType="number-pad"
                      maxLength={10}
                      value={value}
                      onChangeText={onChange}

                      disabled={loading}
                    />
                  )}
                />
                {errors.mobile && (
                  <Text style={commonStyles.error}>{errors.mobile.message}</Text>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={loading}
                style={[
                  commonStyles.btn,
                  commonStyles.btnSecondary,
                  styles.button,
                  loading && { opacity: 0.6 }
                ]}
                onPress={handleSubmit(handleSendOtp)}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={commonStyles.btnText}>Continue</Text>
                )}
              </TouchableOpacity>
              <View style={[commonStyles.rowCenter, commonStyles.mt_4]}>
                <TouchableOpacity onPress={() => dispatch(setGuest())}>
                  <Text style={styles.skipText}>
                    Continue as guest
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>


    </LinearGradient>


    // </ImageBackground>
  );
}


const styles = StyleSheet.create({
  viewArea: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 80,
    resizeMode: "contain",
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  subTagline: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
  bottomContainer: {
    flex: 2,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  desc: {
    fontSize: 18,
    lineHeight: 26,
    color: "#666",
    textAlign: "center",
    marginBottom: 44,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: '#3C4043',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4D9CFF",
    borderRadius: 6,
    height: 64,
    padding: 14,
    fontSize: 16,
    marginBottom: 2,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 18,
    marginTop: 15
  },
  skipText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500"
  }
});

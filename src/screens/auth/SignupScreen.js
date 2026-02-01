import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import Ionicons from "react-native-vector-icons/Ionicons";
import { commonStyles } from '@assets/styles/commonStyles';
import services from "@api/services";
import LinearGradient from "react-native-linear-gradient";

export default function CreateAccount({ route, navigation }) {

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const { mobile } = route.params || {};

  useEffect(() => {
    setValue('mobile', mobile)
  }, [route])

  const goToOtpScreen = (data) => {
    navigation.navigate('Otp', { name: data.name, mobile: data.mobile, email: data.email })
  }

  return (
    <LinearGradient
      colors={["#ffdcc5ff", "#fff", "#dfdfdfff"]}
      style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill your information below or register with your social account.
            </Text>
          </View>

          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  placeholder="Enter Full Name"
                  placeholderTextColor={'#9e9e9e'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && <Text style={commonStyles.error}>{errors.name.message}</Text>}
          </View>

          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={commonStyles.input2}
                  placeholder="Enter Email Id"
                  placeholderTextColor={'#9e9e9e'}
                  value={value}
                  keyboardType="email-address"
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && <Text style={commonStyles.error}>{errors.email.message}</Text>}
          </View>

          <View style={commonStyles.formGroup}>
            <Text style={commonStyles.label}>Mobile Number</Text>
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
                  style={commonStyles.input2}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor={'#afafaf'}
                  keyboardType="number-pad"
                  maxLength={10}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.mobile && (
              <Text style={commonStyles.error}>{errors.mobile.message}</Text>
            )}
          </View>

          <View style={commonStyles.mt_2}>
            <TouchableOpacity
              style={[commonStyles.btn, commonStyles.btnPrimary]}
              onPress={handleSubmit(goToOtpScreen)}>
              <Text style={commonStyles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Already have an account? <Text style={commonStyles.btnLink}>Sign In</Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    paddingHorizontal: 20,
    marginBottom: 30
  },
  footerText: {
    textAlign: "center",
    marginTop: 30,
    color: "#555"
  }
});

import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import OTPTextInput from "react-native-otp-textinput";
import services from "@api/services";
import { saveToken, saveUserData, fetchUserData, fetchWalletData, fetchWalletTransactions, fetchCoupons } from '@store/slices/authSlice'
import Ionicons from "react-native-vector-icons/Ionicons";
import { commonStyles } from '@assets/styles/commonStyles'
import {
    getHash,
    requestHint,
    useOtpVerify,
} from 'react-native-otp-verify';


export default function OtpScreen({ route, navigation }) {

    const dispatch = useDispatch();
    const { mobile, name, email } = route.params || {};

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [otpMessage, setOtpMessage] = useState(false)
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const { message, timeoutError, stopListener, startListener } = useOtpVerify({ numberOfDigits: 4 });



    const handleOtpChange = (code) => {
        setOtp(code);
        if (code.length < 4) {
            setError("OTP must be 4 digits");
        } else {
            setError("");
        }
    };

    const handleVerify = async () => {
        try {
            setVerifying(true);

            const payload = {
                name: name,
                email: email,
                mobile: mobile,
                otp: otp,
                platform: 2,
            }
            const res = await services.verifyOtpService(payload)
            if (res.data.success) {
                let userId = res?.data?.data?.id
                dispatch(saveToken(res.data.token))
                dispatch(fetchUserData(userId))
                dispatch(fetchWalletData(userId))
                dispatch(fetchWalletTransactions(userId))
                dispatch(fetchCoupons(userId))
                stopListener()
            }
        }
        catch (err) {
            if (err?.response?.status === 400) {
                setOtpMessage(true)
            }
        }
        finally {
            setVerifying(false);
        }
    };

    useEffect(() => {
        if (otp.length === 4) {
            handleVerify();
        }
    }, [otp]);

    useEffect(() => {
        if (message) {
            const otp = /(\d{4})/g.exec(message)[1];
            setOtp(otp);
        }
        startListener()
    }, [message])



    useEffect(() => {
        if (timeLeft === 0) {
            setCanResend(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleResendOtp = async () => {
        if (!canResend) return;

        try {
            await services.sendOtpService({ mobile });
            setTimeLeft(120);
            setCanResend(false);
            setOtp("");
            setOtpMessage(false);
        } catch (e) {
            console.log(e);
        }
    };

    console.log('otp', otp?.length)

    return (
        <LinearGradient
            colors={["#ffdcc5ff", "#fff", "#dfdfdfff"]}
            style={styles.container}>
            <SafeAreaView>
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

                    <Text style={commonStyles.text_1}>Enter your</Text>
                    <Text style={commonStyles.text_1}>Verification Code</Text>

                    <View style={styles.otpContainer}>
                        <OTPTextInput
                            inputCount={4}
                            handleTextChange={handleOtpChange}
                            autoFocus
                            offTintColor="#777777"
                            textInputStyle={{
                                borderRadius: 10,
                                borderWidth: 4,
                                width: 60,
                                height: 60,
                                textAlign: "center",
                                fontSize: 24,
                            }}
                        />
                        {
                            otpMessage && <Text style={commonStyles.error}>Invalid OTP. Please try again.</Text>
                        }
                        {error ? (
                            <Text style={commonStyles.error}>{error}</Text>
                        ) : null}
                    </View>

                    {/* Timer */}
                    <Text style={timeLeft == 0 ? commonStyles.textLight : commonStyles.error}>
                        {formatTime(timeLeft)}
                    </Text>

                    {/* Info */}
                    <Text style={styles.info}>
                        We send verification code to your{" "}
                        <Text style={commonStyles.btnLink}>{mobile ? `${mobile.slice(0, 2)}******${mobile.slice(-2)}` : ""}</Text>.
                        You can check your inbox.
                    </Text>

                    {/* Resend */}
                    <TouchableOpacity
                        disabled={!canResend}
                        onPress={handleResendOtp}
                    >
                        <Text
                            style={[
                                commonStyles.btnLink,
                                commonStyles.mt_2,
                                timeLeft > 0 && commonStyles.textLight
                            ]}
                        >
                            I didn't receive the code? Send again
                        </Text>
                    </TouchableOpacity>

                    {/* Verify Button */}
                    <TouchableOpacity
                        disabled={verifying || otp.length !== 4}
                        onPress={handleVerify}
                        style={[
                            commonStyles.btn,
                            commonStyles.btnSecondary,
                            styles.button,
                            (verifying || otp.length !== 4) && { opacity: 0.6 }
                        ]}
                    >
                        {verifying ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={commonStyles.btnText}>Verify</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 25
    },
    backButton: {
        marginBottom: 20
    },
    otpContainer: {
        width: '100%',
        marginTop: 30,
        marginBottom: 20
    },
    info: {
        color: "#555",
        marginTop: 10,
    },
    resend: {
        color: "#f2a93b",
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        borderRadius: 6,
        paddingVertical: 18,
        marginTop: 30
    },
});

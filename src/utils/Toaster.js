import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const Toaster = {
  message: ({ text1 }) => (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: '#333',
        // backgroundColor: '#28a745',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 12,
          textAlign: 'center',
        }}
        numberOfLines={1}>
        {text1}
      </Text>
    </View>
  ),
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        borderRadius: 20,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        paddingHorizontal: 15,
        paddingVertical: 8,
        minWidth: 100,
        maxWidth: '90%',
      }}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      text1Style={{ fontSize: 14, color: '#fff' }}
      text2Style={{ fontSize: 12, color: '#999' }}
      renderLeadingIcon={() => null}
    />
  ),
  error: ({ text1 }) => (
    <View
      style={{
        alignSelf: 'center',
        // backgroundColor: '#333',
        backgroundColor: '#f00',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 12,
          textAlign: 'center',
        }}
        numberOfLines={1}>
        {text1}
      </Text>
    </View>
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'blue', backgroundColor: '#f0f8ff' }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}
      text2Style={{ fontSize: 14, color: 'black' }}
    />
  ),
};

// Helper function to show toast
export const showToast = (type = 'success', text1 = '', text2 = '', options = {}) => {
  Toast.show({
    type,
    text1,
    text2,
    position: options.position || 'top',
    visibilityTime: options.visibilityTime || 3000,
    autoHide: options.autoHide !== undefined ? options.autoHide : true,
    ...options,
  });
};

export default Toaster;

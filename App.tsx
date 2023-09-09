import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/frontend/navigators/AuthStack/AuthStack';
import {AuthProvider, useAuth} from './src/backend/context/authContext';
import AppNavigation from './src/frontend/appNavigation';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {LogBox} from 'react-native';
import {withIAPContext} from 'react-native-iap';

LogBox.ignoreAllLogs();

function App() {
  const {user, loading} = useAuth();

  return (
    <>
      <NavigationContainer>
        {user ? <AppNavigation /> : <AuthStack />}
      </NavigationContainer>

      <Toast
        config={{
          success: props => (
            <BaseToast
              {...props}
              text1NumberOfLines={3}
              style={{borderLeftColor: 'lime'}}
              contentContainerStyle={{paddingHorizontal: 30}}
              text1Style={{
                fontSize: 14,
                fontWeight: 'bold',
              }}
            />
          ),
          error: props => (
            <ErrorToast
              {...props}
              text1NumberOfLines={3}
              style={{borderLeftColor: 'red'}}
              contentContainerStyle={{paddingHorizontal: 30}}
              text1Style={{
                fontSize: 14,
                fontWeight: 'bold',
              }}
            />
          ),
        }}
      />
    </>
  );
}

export default withIAPContext(() => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ActionSheetProvider>
          <App></App>
        </ActionSheetProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo'

import { Archivo_400Regular, Archivo_700Bold} from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'

import AppStack from './src/routes/AppStack';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Archivo_700Bold,
    Archivo_400Regular,
    Poppins_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    )
  }
}
import { Search } from "./Search";
import React from "react";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens } from "..";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { BottomTabsParamList } from "@/Navigation/Main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

type SearchScreenNavigatorProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, MainScreens.SEARCH>,
  NativeStackScreenProps<RootStackParamList>
>;

export const SearchContainer = ({ navigation }: SearchScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    console.log('navigate')
    navigation.navigate(screen, params);
  }

  const onBack = () => {
    console.log('back')
    navigation.navigate(MainScreens.SEARCH)
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBack
    )

    return () => backHandler.remove()
  }, [])

  return <Search onNavigate={onNavigate}/>; 
};

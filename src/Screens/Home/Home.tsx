import FilledButton from "@/Components/Button/FilledButton";
import OutlinedButton from "@/Components/Button/OutlinedButton";
import TextButton from "@/Components/Button/TextButton";
import LightTextButton from "@/Components/Button/LightTextButton";
import Card, { CardDirection } from "@/Components/Card/Card";
import Input from "@/Components/Input/Input";
import RatingStars from "@/Components/RatingStars/RatingStars";
import useInputController from "@/Components/Input/useInputController";

import { IProfile } from "@/Model/profile";
import { Recipe } from '@/Model/foodRecommendation';

import userApi from "@/Services/user";
import foodApi from '@/Services/food';

import profileStore from "@/Store/reducers/profile";
import { profileSelector } from "@/Store/selector";
import { Colors, FontSize } from "@/Theme/Variables"
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Text, Image, StyleSheet, Pressable, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux";

import { RootScreens } from '..';

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Home = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [breakfastRecipes, setBreakFastRecipes] = useState<Recipe[]>([]);
  const [lunchRecipes, setLunchRecipes] = useState<Recipe[]>([]);
  // const [dinnerRecipes, setDinnerRecipes] = useState<Recipe[]>([]);
  const [snackRecipes, setSnackRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setBreakFastRecipes(await foodApi.getRecipes('', 'Breakfast'))
      setLunchRecipes(await foodApi.getRecipes('', 'Lunch'))
      setSnackRecipes(await foodApi.getRecipes('', 'Snack'))
      setLoading(false)
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}> 

      <View>

        {/* Breakfast */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Bữa sáng</Text>

          <LightTextButton 
            title="See all" 
            onPress={() => onNavigate(RootScreens.BREAKFAST)}
          />
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          ) 
          : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.containerRow}>
                {breakfastRecipes.map((item) => (
                  <Card 
                    imageUrl={item.image}
                    title={item.label}
                    subtitle={item.healthLabels.slice(0, 5).join(', ')}
                    direction={CardDirection.COLUMN} 
                    onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Lunch */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Bữa trưa</Text>

          <LightTextButton 
            title="See all" 
            onPress={() => onNavigate(RootScreens.LUNCH)}
          />
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          ) 
          : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.containerRow}>
                {lunchRecipes.map((item) => (
                  <Card 
                    imageUrl={item.image}
                    title={item.label}
                    subtitle={item.healthLabels.slice(0, 5).join(', ')}
                    direction={CardDirection.COLUMN} 
                    onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Snack */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Ăn vặt</Text>

          <LightTextButton 
            title="See all"
            onPress={() => onNavigate(RootScreens.SNACK)}
          />
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          ) 
          : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.containerRow}>
                {snackRecipes.map((item) => (
                  <Card 
                    imageUrl={item.image}
                    title={item.label}
                    subtitle={item.healthLabels.slice(0, 5).join(', ')}
                    direction={CardDirection.COLUMN} 
                    onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

      </View>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerRow: { 
      width: '100%',
      elevation: 0, 
  
      backgroundColor: Colors.WHITE,
      
      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      gap: 12
  },
  titleRow: { 
      width: '100%',
      elevation: 0, 

      backgroundColor: Colors.WHITE,
      
      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      marginVertical: 10,
      gap: 12
  },
  containerColumn: {
      maxWidth: 220,
      borderRadius: 8,
      backgroundColor: Colors.WHITE,

      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      elevation: 20,

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 12
  },
  imageColumn: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
  },
  imageRow: {
      width: 120,
      height: 120
  },
  content: {
      paddingHorizontal: 16,
      backgroundColor: Colors.WHITE,
      
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
  },
  title: {
      fontWeight: '500',
      fontSize: FontSize.SMALL,
      color: Colors.PRIMARY_TEXT,
      // flex: 1
  },
  subtitle: {
      fontWeight: '400',
      fontSize: 12,
      color: Colors.SECONDARY_TEXT
  },
  tail: {
      paddingHorizontal: 16,
      paddingBottom: 12
  },
})

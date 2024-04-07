import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Product, setProductData} from '../redux/reducers/productDataSlice';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await response.json();
      dispatch(setProductData(data));
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textStyle}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  homeButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign:'center',
    margin: 10,
}
});

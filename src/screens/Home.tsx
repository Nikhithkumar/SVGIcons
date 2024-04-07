import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Product } from '../redux/reducers/productDataSlice';

const width = Dimensions.get('window').width

const Home = () => {
    const products: Product[] = useSelector((state: RootState) => state.productData);
    const listEmptyComponent = () => {
        return (
            <View style={styles.listNotFoundContainer}>
                <Text style={styles.textStyle}>No Data Found!</Text>
            </View>
        )
    }

    const renderItem = ({item}:Product) => {
        return (
            <View style={styles.productContainer}>
                <Image source={{ uri: item?.image }} width={30} height={30} style={{borderRadius:10}} />
                <Text style={styles.textStyle}>₹ {item?.price}</Text>
                <Text style={styles.textStyle}>{item?.category}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={products ?? []}
                numColumns={2}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                keyExtractor={(item, index) => `${item.id}+${index}`}
                ListEmptyComponent={listEmptyComponent}
            />
        </View>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal:10
    },
    flatListStyle: {
        marginVertical:5,
    },
    listNotFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productContainer: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginVertical:10,
        borderWidth:1,
        borderColor:'black',
        width:width*0.4,
        margin:10
    },
    textStyle: {
        fontSize: 12,
        fontWeight: '600',
        color: 'black'
    }
})
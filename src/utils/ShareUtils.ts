import { Share, Linking, Platform } from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

/**
 * Generates a Firebase Dynamic Link for a specific restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<string>} - The generated dynamic link.
 */
export const generateDynamicLink = async (restaurantId) => {
    try {
        const dynamicLink = await dynamicLinks().buildShortLink({
            link: `https://yourapp.com/restaurant/${restaurantId}`,
            domainUriPrefix: 'https://yourapp.page.link',
            android: {
                packageName: 'com.yourapp',
            },
            ios: {
                bundleId: 'com.yourapp',
                appStoreId: '123456789', // Replace with your App Store ID
            },
        });

        return dynamicLink;
    } catch (error) {
        console.error('Error generating dynamic link:', error);
        throw error;
    }
};

/**
 * Shares a restaurant's dynamic link using the native sharing options.
 * @param {string} restaurantId - The ID of the restaurant to share.
 */
export const shareRestaurantLink = async (restaurantId) => {
    try {
        const dynamicLink = await generateDynamicLink(restaurantId);

        await Share.share({
            message: `Check out this restaurant: ${dynamicLink}`,
        });
    } catch (error) {
        console.error('Error sharing link:', error);
    }
};

/**
 * Handles deep linking when the app is opened via a dynamic link or deep link.
 * @param {Function} navigation - The navigation object from React Navigation.
 */
export const handleDeepLinkNavigation = async (navigation) => {
    const handleUrl = (url) => {
        const { path, queryParams } = Linking.parse(url);

        if (path.startsWith('restaurant')) {
            const id = queryParams.id || path.split('/')[1]; // Extract ID from path
            navigation.navigate('RestaurantDetails', { id });
        }
    };

    // Handle the initial URL when the app is first launched
    Linking.getInitialURL().then((url) => {
        if (url) {
            handleUrl(url);
        }
    });

    // Listen for any new deep links
    Linking.addEventListener('url', (event) => {
        handleUrl(event.url);
    });

    return () => {
        Linking.removeEventListener('url', handleUrl);
    };
};

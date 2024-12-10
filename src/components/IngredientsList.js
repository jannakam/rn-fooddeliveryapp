import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef, useMemo } from 'react'
import ingredients from '../data/ingredients'
import Ingredient from './Ingredient'
import COLORS from '../constants/colors'

const IngredientsList = ({ menuItemId }) => {
    // Create an array of animated values, one for each possible ingredient
    const fadeAnims = useRef(
        Array(6).fill(0).map(() => new Animated.Value(0))
    ).current;
    
    // Generate a random but consistent set of ingredients for each menu item
    const randomIngredients = useMemo(() => {
        // Use menuItemId as a seed for pseudo-random selection
        const initialSeed = menuItemId ? 
            menuItemId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) 
            : Date.now();
        
        // Fisher-Yates shuffle with seeded random
        const shuffled = [...ingredients];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const seededRandom = Math.abs(Math.sin(initialSeed * (i + 1)) * 10000);
            const j = Math.floor(seededRandom % (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Select 4-6 random ingredients
        const count = Math.abs(Math.floor(Math.sin(initialSeed) * 10000)) % 3 + 4;
        return shuffled.slice(0, count);
    }, [menuItemId]);

    useEffect(() => {
        // Reset all animations
        fadeAnims.forEach(anim => anim.setValue(0));

        // Create staggered animations
        const animations = fadeAnims.map((fadeAnim, index) => {
            return Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 100, // Stagger each ingredient by 100ms
                useNativeDriver: true,
            });
        });

        // Run all animations in sequence
        Animated.stagger(100, animations.slice(0, randomIngredients.length)).start();
    }, [menuItemId, randomIngredients.length]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredients</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {randomIngredients.map((ingredient, index) => (
                    <Animated.View 
                        key={ingredient.id} 
                        style={[
                            styles.ingredientItem,
                            {
                                opacity: fadeAnims[index],
                                transform: [{
                                    translateY: fadeAnims[index]?.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    })
                                }]
                            }
                        ]}
                    >
                        <Ingredient image={ingredient.image} />
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    );
};

export default IngredientsList;

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: 'OpenSans_700Bold',
        marginBottom: 5,
        color: COLORS.PRIMARY,
    },
    scrollContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    ingredientItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    }
});

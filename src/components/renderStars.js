import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome";

// Function to render stars based on the rating
const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starType = i < Math.floor(rating)
        ? 'star'
        : i < Math.ceil(rating)
        ? 'star-half-full'
        : 'star-o';
      return <Icon key={i} name={starType} size={16} color="goldenrod" style={styles.star} />;
    });
  };

const styles = {
    star: {
        marginHorizontal: 2,
      },
}

export default renderStars;
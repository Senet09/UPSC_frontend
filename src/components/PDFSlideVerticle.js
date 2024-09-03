// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, Dimensions, View, ActivityIndicator, Text } from 'react-native';
// import Pdf from 'react-native-pdf';

// const PDFExample = ({ link }) => {
//     const [numberOfPages, setNumberOfPages] = useState(0);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false); // State to track if PDF is loaded
//     const pdfRef = useRef(null);

//     useEffect(() => {
//         console.log(`Number of pages: ${numberOfPages}`);
//     }, [numberOfPages]);

//     useEffect(() => {
//         console.log(`Current page: ${currentPage}`);
//     }, [currentPage]);

//     const handlePressLink = (uri) => {
//         console.log(`Link pressed: ${uri}`);
//     };

//     const handleError = (err) => {
//         setError(err);
//         console.log(err);
//     };

//     const handleLoadComplete = (numPages) => {
//         setNumberOfPages(numPages);
//         setIsLoaded(true); // Set isLoaded to true when PDF is loaded
//     };

//     return (
//         <View style={styles.container}>
//             <Pdf
//                 ref={pdfRef}
//                 trustAllCerts={false}
//                 enableRTL={true}
//                 enableAnnotationRendering={true}
//                 enablePaging={true} // Enable paging for smooth page navigation
//                 source={{ uri: link, cache: true }}
//                 enableZoom={true} // Enable zoom
//                 enableSwipe={true} // Enable swipe gestures for page navigation
//                 fitWidth={true}
//                 horizontal={false} // Set horizontal to false for vertical scrolling
//                 onLoadComplete={handleLoadComplete}
//                 onPageChanged={(page, numPages) => setCurrentPage(page)}
//                 onError={handleError}
//                 onPressLink={handlePressLink}
//                 page={currentPage} // Display only the current page
//                 style={styles.pdf}
//             />
//             {!isLoaded && (
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size="large" color="#0000ff" />
//                 </View>
//             )}
//             {isLoaded && (
//                 <View style={styles.pageNumberContainer}>
//                     <Text style={styles.pageNumberText}>{currentPage}/{numberOfPages}</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: "#ffffff"
//     },
//     pdf: {
//         flex: 1,
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height - 250,
//         backgroundColor: "#ffffff"
//     },
//     loadingContainer: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
//     },
//     pageNumberContainer: {
//         position: 'absolute',
//         top: 20,
//         right: 20,
//         backgroundColor: 'rgba(255, 255, 255, 0.5)',
//         padding: 4,
//         borderWidth: 1,
//         borderRadius: 20,
//         borderRadius: 5,
//     },
//     pageNumberText: {
//         fontSize: 16,
//         color: '#000000'
//     },
// });

// export default PDFExample;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFExample = ({ link }) => {
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const handleLoadComplete = (numPages) => {
        setNumberOfPages(numPages);
        setIsLoaded(true);
    };

    const handleError = (err) => {
        setError(err);
        console.log(err);
    };

    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                enableRTL={true}
                enableAnnotationRendering={true}
                source={{ uri: link, cache: true }}
                fitWidth={true}
                horizontal={false}
                onLoadComplete={handleLoadComplete}
                onError={handleError}
                style={styles.pdf}
            />
            {!isLoaded && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff"
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: "#ffffff"
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    },
});

export default PDFExample;

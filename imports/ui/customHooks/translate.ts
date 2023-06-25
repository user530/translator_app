import React from 'react';
import { Meteor } from 'meteor/meteor';
import { TranslationDict } from '/imports/api/methods'

export const useTranslator = () => {

    const [initTranslate, setInitTranslate] = React.useState<boolean>(false);

    // Helper function to create the list of unique tokens from the list of elements
    const elementsToTokens = React.useCallback(
        (elementsToTranslate: (Element | Node)[]) => {
            const tokensArr = elementsToTranslate.map((elem) => elem.textContent || '');

            return [...new Set(tokensArr)]
        }, [])

    // Get translation dict for unique tokens
    const translate = React.useCallback(
        async (elementsToTranslate: (Element | Node)[]) => {

            console.log('Translate function fired!');

            // Make tokens array from elements
            const tokens: string[] = elementsToTokens(elementsToTranslate);

            console.log('Tokens:', tokens);

            // Translate tokens and prepare translations dictionary
            const translationsDict: TranslationDict = await Meteor.callAsync("getTranslations", { tokens });

            console.log('Translation dict:', translationsDict);

            // Mutate elements
            elementsToTranslate.forEach(
                (element: Element | Node) =>
                    element.textContent = element.textContent ?
                        translationsDict[element.textContent] || 'noTranslation' :
                        ''

            )

            console.log('After element mutation!');
        }, [])

    return {
        initTranslate,
        setInitTranslate,
        translate
    }
};




// // Main translation logic
// export const translatorLogic = async ({ elements, observer, setIsObserved }:
//     {
//         elements: Element[],
//         observer: MutationObserver,
//         setIsObserved: React.Dispatch<React.SetStateAction<boolean>>
//     }
// ) => {

//     // Get unique tokens
//     const tokens = elementsToTokens(elements);

//     // Get translation dict for unique tokens
//     const translations: TranslationDict = await Meteor.callAsync("getTranslations", { tokens })

//     // Disconnect observer before mutation 
//     observer.disconnect();

//     // Mutate (translate) elements
//     elements.forEach((element: Element) =>
//         element.textContent = element.textContent ? translations[element.textContent] : 'noTranslation')

//     // Set observer flag to restart the observer after re-render
//     setIsObserved(false);
// }
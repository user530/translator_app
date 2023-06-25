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

            // Make tokens array from elements
            const tokens: string[] = elementsToTokens(elementsToTranslate);

            // Translate tokens and prepare translations dictionary
            const translationsDict: TranslationDict = await Meteor.callAsync("getTranslations", { tokens });

            // Mutate elements
            elementsToTranslate.forEach(
                (element: Element | Node) =>
                    element.textContent = element.textContent ?
                        translationsDict[element.textContent] || 'noTranslation' :
                        ''
            )
        }, [])

    return {
        initTranslate,
        setInitTranslate,
        translate
    }
};
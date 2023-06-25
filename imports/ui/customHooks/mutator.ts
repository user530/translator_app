import React from 'react';

export function useMutationObserver(classSelector: string,
    mutationCallback: (elementsToMutate: (Element | Node)[]) => void) {

    const [isObserving, setIsObserving] = React.useState<boolean>(false);

    const mutationsToElements = React.useCallback(
        (mutationList: MutationRecord[], classSelector: string) => {
            let result: (Element | Node)[] = [];

            // Iterate over mutations
            mutationList.forEach(
                (mutation) => {

                    const addedNodes: NodeList = mutation.addedNodes;

                    // New cells added 
                    if (addedNodes.length > 0) {
                        addedNodes.forEach(
                            (rowNode: Node) => {

                                if (!(rowNode instanceof HTMLElement)) return;

                                const elemToTranslate = rowNode.querySelector(`.${classSelector}`);

                                if (elemToTranslate)
                                    result.push(elemToTranslate);
                            }
                        )
                    }

                    // Updated cells (in this case mutation is a text node inside the TD element)
                    const mutatedNode = mutation.target;

                    // If updated cell is the one to translate
                    if ((mutatedNode instanceof Element || mutatedNode instanceof Node) &&
                        mutatedNode.parentElement &&
                        mutatedNode.parentElement.className.includes(classSelector))
                        result.push(mutatedNode);
                }
            )

            return result;
        }, [])

    const observer = new MutationObserver(
        async (mutationList: MutationRecord[]) => {

            // Toggle off observer to mutate data
            stopObserver();

            // Prepare the data for the callback
            let elementsToMutate: (Element | Node)[] = mutationsToElements(mutationList, classSelector);

            // Execute callback with the data collected from the mutations
            await mutationCallback(elementsToMutate);

            // Prepare flag 
            setIsObserving(false);
        });

    // Default observer settings
    const defaultObsSettings: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    }

    // Observer begins observe
    const startObserver = React.useCallback(
        (target: Node, options?: MutationObserverInit) =>
            observer.observe(target, options || defaultObsSettings),
        []);

    // Disconnect the observer
    const stopObserver = React.useCallback(
        () => observer.disconnect(),
        []);

    return {
        startObserver,
        stopObserver,
        isObserving,
        setIsObserving
    }
};

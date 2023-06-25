import React from 'react';

export function useMutationObserver(classSelector: string,
    mutationCallback: (elementsToMutate: (Element | Node)[]) => void) {

    const [isObserving, setIsObserving] = React.useState<boolean>(false);

    const mutationsToElements = React.useCallback(
        (mutationList: MutationRecord[], classSelector: string) => {
            let result: (Element | Node)[] = [];

            console.log('Mutations to elements fired! List:', mutationList);

            // Iterate over mutations
            mutationList.forEach(
                (mutation) => {
                    console.log('Mutation:', mutation);

                    const addedNodes: NodeList = mutation.addedNodes;
                    console.log('Mutation Added Nodes List:', addedNodes);

                    // New cells added 
                    if (addedNodes.length > 0) {
                        addedNodes.forEach(
                            (rowNode: Node) => {
                                console.log('Mutation Added Node:', rowNode)
                                if (!(rowNode instanceof HTMLElement)) return;

                                const elemToTranslate = rowNode.querySelector(`.${classSelector}`);
                                console.log('Element to translate:', elemToTranslate);

                                if (elemToTranslate) {
                                    result.push(elemToTranslate);
                                    console.log('Added element to translation list.', elemToTranslate)
                                }
                            }
                        )
                    }

                    // Updated cells (in this case mutation is a text node inside the TD element)
                    const mutatedNode = mutation.target;
                    console.log('Updated node:', mutatedNode);
                    console.log('Instance of:', mutatedNode instanceof Element || mutatedNode instanceof Node);
                    console.log('Parent:', mutatedNode.parentElement);
                    console.log('Classname has selector:', mutatedNode.parentElement!.className.includes(classSelector));

                    // If updated cell is the one to translate
                    if ((mutatedNode instanceof Element || mutatedNode instanceof Node) &&
                        mutatedNode.parentElement &&
                        mutatedNode.parentElement.className.includes(classSelector)) {

                        result.push(mutatedNode);
                        console.log('Added element to translation list.', mutatedNode)
                    }
                }
            )


            console.log('Mutations to elements result:', result)
            return result;
        }, [])

    const observer = new MutationObserver(
        async (mutationList: MutationRecord[]) => {

            console.log('Mutation CB fired!');
            console.log(mutationList);

            // Toggle off observer to mutate data
            stopObserver();

            console.log('Observer stopped!');

            // Prepare the data for the callback
            let elementsToMutate: (Element | Node)[] = mutationsToElements(mutationList, classSelector);

            // Execute callback with the data collected from the mutations
            await mutationCallback(elementsToMutate);

            // Prepare flag 
            setIsObserving(false);

            console.log('Callback ended!');
        });

    const defaultObsSettings: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    }

    const startObserver = React.useCallback(
        (target: Node, options?: MutationObserverInit) => {
            console.log('Start observer fired');
            observer.observe(target, options || defaultObsSettings)
        }
        , []);

    const stopObserver = React.useCallback(
        () => {
            console.log('Stop observer fired');
            observer.disconnect()
        }, []);

    return {
        startObserver,
        stopObserver,
        isObserving,
        setIsObserving
    }
};

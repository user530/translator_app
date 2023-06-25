import { myDataSource } from '/server/typeorm/data_source';
import { In } from 'typeorm';
import { TranslationsEntity, TranslationRow } from '/server/typeorm/entities/'

export const typeormInit: () => void
    = async () => {
        try {
            await myDataSource.initialize();
            console.log('Typeorm Datasource Initialized!');
        } catch (error) {
            console.log('Typeorm Datasource Initialization Error:\n', error)
        }
    }

export const getTranslations = async ({ tokens }: { tokens: string[] }) => {

    // Query the database
    const result: TranslationRow[] = await TranslationsEntity.findBy({
        token: In(tokens)
    })

    // Create transltation dictionary
    const trnsltDict: TranslationDict = result.reduce(
        (dictionary, { token, translation }) => ({ ...dictionary, [token]: translation }), {});

    return trnsltDict;
}

export type TranslationDict = {
    [token: string]: string
}

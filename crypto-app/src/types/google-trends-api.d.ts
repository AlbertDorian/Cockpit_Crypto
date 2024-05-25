declare module 'google-trends-api' {
    interface TrendsOptions {
        keyword: string | string[];
        startTime?: Date;
        endTime?: Date;
        geo?: string;
        hl?: string;
        category?: number;
        property?: string;
        resolution?: string;
        timeframe?: string;
    }

    interface TrendsResult {
        /* Structure des résultats renvoyés par l'API */
        [key: string]: any;
    }

    interface TrendsApi {
        interestOverTime(options: TrendsOptions): Promise<TrendsResult>;
        interestByRegion(options: TrendsOptions): Promise<TrendsResult>;
        relatedQueries(options: TrendsOptions): Promise<TrendsResult>;
        relatedTopics(options: TrendsOptions): Promise<TrendsResult>;
        /* Ajoutez d'autres méthodes de l'API ici si nécessaire */
    }

    const googleTrends: TrendsApi;
    export default googleTrends;
}

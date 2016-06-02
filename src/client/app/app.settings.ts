export interface ISettings {  
    environment: string,
    webApiUrl: string,
}

export class AppSettings {  
    public static settings: ISettings;
}